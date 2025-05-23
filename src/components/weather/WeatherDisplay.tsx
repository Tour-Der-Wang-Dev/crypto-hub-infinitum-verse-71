
import { Card, CardContent } from '@/components/ui/card';
import { useWeather } from '@/hooks/useWeather';
import { Cloud, CloudRain, CloudSnow, Sun, CloudLightning, Wind } from 'lucide-react';

interface WeatherDisplayProps {
  className?: string;
  lat?: number;
  lon?: number;
}

const WeatherDisplay = ({ className, lat, lon }: WeatherDisplayProps) => {
  const { weather, loading, error } = useWeather(lat, lon);

  if (loading) {
    return (
      <Card className={`card-glass h-28 ${className || ''}`}>
        <CardContent className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-infi-gold"></div>
        </CardContent>
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card className={`card-glass h-28 ${className || ''}`}>
        <CardContent className="flex items-center justify-center h-full">
          <p className="text-gray-400 text-sm">Unable to load weather</p>
        </CardContent>
      </Card>
    );
  }

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'clear':
        return <Sun className="text-infi-gold h-10 w-10" />;
      case 'clouds':
        return <Cloud className="text-gray-400 h-10 w-10" />;
      case 'rain':
        return <CloudRain className="text-blue-400 h-10 w-10" />;
      case 'snow':
        return <CloudSnow className="text-white h-10 w-10" />;
      case 'storm':
        return <CloudLightning className="text-purple-400 h-10 w-10" />;
      case 'mist':
        return <Wind className="text-gray-400 h-10 w-10" />;
      default:
        return <Sun className="text-infi-gold h-10 w-10" />;
    }
  };

  return (
    <Card className={`card-glass overflow-hidden ${className || ''}`}>
      <CardContent className="flex items-center p-4 h-full">
        <div className="mr-4">
          {getWeatherIcon()}
        </div>
        <div>
          <p className="text-xs text-gray-400">{weather.city}</p>
          <p className="text-2xl font-bold text-white">{weather.temperature}°C</p>
          <p className="text-sm text-gray-300">{weather.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;
