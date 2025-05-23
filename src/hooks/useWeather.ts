
import { useState, useEffect } from 'react';

export interface WeatherData {
  temperature: number;
  condition: 'clear' | 'clouds' | 'rain' | 'snow' | 'storm' | 'mist';
  city: string;
  iconUrl: string;
  description: string;
}

export const useWeather = (lat?: number, lon?: number) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // For now, we'll use mock weather data
        // In a production app, this would use an API like OpenWeatherMap
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate mock weather based on time of day
        const hour = new Date().getHours();
        let condition: WeatherData['condition'];
        let temperature: number;
        let description: string;
        
        // Randomize weather a bit
        const random = Math.random();
        
        if (hour >= 6 && hour < 18) {
          // Daytime
          if (random > 0.7) {
            condition = 'clouds';
            description = 'Partly cloudy';
          } else {
            condition = 'clear';
            description = 'Clear sky';
          }
          temperature = 22 + Math.floor(random * 10);
        } else {
          // Nighttime
          if (random > 0.8) {
            condition = 'rain';
            description = 'Light rain';
          } else if (random > 0.5) {
            condition = 'clouds';
            description = 'Cloudy';
          } else {
            condition = 'clear';
            description = 'Clear night';
          }
          temperature = 15 + Math.floor(random * 7);
        }

        // Determine icon based on condition and time
        const isDaytime = hour >= 6 && hour < 18;
        let iconUrl = '';
        
        switch (condition) {
          case 'clear':
            iconUrl = isDaytime ? '01d.png' : '01n.png';
            break;
          case 'clouds':
            iconUrl = isDaytime ? '03d.png' : '03n.png';
            break;
          case 'rain':
            iconUrl = isDaytime ? '10d.png' : '10n.png';
            break;
          case 'snow':
            iconUrl = isDaytime ? '13d.png' : '13n.png';
            break;
          case 'storm':
            iconUrl = isDaytime ? '11d.png' : '11n.png';
            break;
          case 'mist':
            iconUrl = isDaytime ? '50d.png' : '50n.png';
            break;
        }

        // Use placeholder icons for now (in a real app, use real URLs)
        iconUrl = `/placeholder.svg`;

        setWeather({
          temperature,
          condition,
          city: 'Bangkok',
          iconUrl,
          description,
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch weather:', err);
        setError('Failed to fetch weather data');
        setLoading(false);
      }
    };

    fetchWeather();

    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [lat, lon]);

  return { weather, loading, error };
};
