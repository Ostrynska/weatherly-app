export const formatUnixTimestamp = (dt: number): string => {
  const date = new Date(dt * 1000);
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleString('en-GB', options);
};
