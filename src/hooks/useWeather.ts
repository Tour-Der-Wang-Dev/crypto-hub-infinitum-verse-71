
import { useState, useEffect } from 'react';

export interface WeatherData {
  temperature: number;
  description: string;
  condition: 'clear' | 'clouds' | 'rain' | 'snow' | 'storm' | 'mist';
  city: string;
  humidity: number;
  windSpeed: number;
}

interface UseWeatherReturn {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export const useWeather = (lat?: number, lon?: number): UseWeatherReturn => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        // Mock weather data for demo
        const mockWeatherData: WeatherData = {
          temperature: 28,
          description: 'Partly cloudy',
          condition: 'clouds',
          city: 'Bangkok',
          humidity: 65,
          windSpeed: 12,
        };

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        setWeather(mockWeatherData);
      } catch (err) {
        setError('Failed to fetch weather data');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  return { weather, loading, error };
};
