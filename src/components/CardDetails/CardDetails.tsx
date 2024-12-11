import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks.ts';
import HourlyForecastGraph from './HourlyForecast/HourlyForecast.tsx';
import Title from './Title/Title.tsx';
import CurrentWeather from './CurrentWeather/CurrentWeather.tsx';
import ConditionsList from './ConditionsList/ConditionsList.tsx';
import styles from './CardDetails.module.scss';

const CardDetails: React.FC = () => {
    const [hovered, setHovered] = useState(false);
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const city = useAppSelector((state) =>
        state.city.cityList.find((city) => city.id.toString() === id)
    );

    useEffect(() => {
        if (city) {
        const fetchHourlyForecast = async () => {
            try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.REACT_APP_API_WEATHER}&units=metric`
            );
            const data = await response.json();
                setHourlyForecast(data.list.slice(0, 8));
            } catch (error) {
            console.error('Error fetching hourly forecast:', error);
            }
        };
        fetchHourlyForecast();
        }
    }, [city]);

    if (!city) {
        return (
        <div className={styles.center}>
            <h1 className={styles.notFound}>City not found!</h1>
        </div>
        );
    }

    const sunrise = new Date(city.sys.sunrise * 1000).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const sunset = new Date(city.sys.sunset * 1000).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <section className={styles.cardDetails}>
            <Title
            cityName={city.name}
            onBack={() => navigate(-1)}
            hovered={hovered}
            setHovered={setHovered}
            date={city.dt}
            />
            <div className={styles.information}>
                <CurrentWeather
                    temp={city.main.temp}
                    feelsLike={city.main.feels_like}
                    description={city.weather[0].description}
                    icon={city.weather[0].icon}
                />
                <ConditionsList
                    humidity={city.main.humidity}
                    windSpeed={city.wind.speed}
                    pressure={city.main.pressure}
                    visibility={city.visibility}
                    sunrise={sunrise}
                    sunset={sunset}
                />
            </div>
            <div className={styles.extendedForecast}>
                <HourlyForecastGraph hourlyData={hourlyForecast} />
            </div>
        </section>
    );
};

export default CardDetails;
