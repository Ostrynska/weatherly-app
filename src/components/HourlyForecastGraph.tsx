import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';
import styles from './HourlyForecastGraph.module.scss';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

interface HourlyForecastGraphProps {
  hourlyData: Array<{
    dt: number;
    main: { temp: number };
    wind: { speed: number };
    weather: [{ icon: string }];
  }>;
}

const HourlyForecastGraph: React.FC<HourlyForecastGraphProps> = ({ hourlyData }) => {
  if (!hourlyData || hourlyData.length === 0) {
    return <p>No data available for hourly forecast.</p>;
  }

  const data = {
    labels: hourlyData.map((data) =>
      new Date(data.dt * 1000).toLocaleTimeString('en-GB', {
        hour: '2-digit',
      })
    ),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: hourlyData.map((data) => data.main.temp),
        borderColor: '#f5a623',
        backgroundColor: 'rgba(245, 166, 35, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false, // Hide the x-axis
      },
      y: {
        display: false, // Hide the y-axis
      },
    },
  };

  const getIconUrl = (icon: string) =>
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className={styles.forecastContainer}>
      <h2 className={styles.title}>
        <span role="img" aria-label="clock">
          ⏰
        </span>{' '}
        24-Hour Forecast
      </h2>
      <div className={styles.graphContainer}>
        <Line data={data} options={options} />
      </div>
      <div className={styles.forecastItems}>
        {hourlyData.map((data, index) => (
          <div key={index} className={styles.forecastItem}>
            <div className={styles.temperature}>{Math.round(data.main.temp)}°</div>
            <img
              src={getIconUrl(data.weather[0].icon)}
              alt="weather icon"
              className={styles.icon}
            />
            <div className={styles.windSpeed}>
              {data.wind.speed.toFixed(1)} km/h
            </div>
            <div className={styles.time}>
              {new Date(data.dt * 1000).toLocaleTimeString('en-GB', {
                hour: '2-digit',
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecastGraph;
