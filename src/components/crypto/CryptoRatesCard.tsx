
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bitcoin, TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoRate {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  icon: string;
}

const CryptoRatesCard = () => {
  const [rates, setRates] = useState<CryptoRate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Mock data for now - will be replaced with real API
        const mockRates: CryptoRate[] = [
          { symbol: 'BTC', name: 'Bitcoin', price: 43250.50, change24h: 2.5, icon: '₿' },
          { symbol: 'ETH', name: 'Ethereum', price: 2680.75, change24h: -1.2, icon: 'Ξ' },
          { symbol: 'BNB', name: 'BNB', price: 315.20, change24h: 0.8, icon: '🔶' },
          { symbol: 'SOL', name: 'Solana', price: 98.45, change24h: 3.2, icon: '◎' },
          { symbol: 'USDT', name: 'Tether', price: 1.00, change24h: 0.0, icon: '₮' },
        ];
        
        setRates(mockRates);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch crypto rates:', error);
        setLoading(false);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card className="card-glass">
        <CardContent className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-infi-gold"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-infi-gold">
          <Bitcoin size={20} />
          Live Crypto Rates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {rates.map((rate) => (
            <div key={rate.symbol} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg">{rate.icon}</span>
                <div>
                  <p className="font-medium text-white">{rate.symbol}</p>
                  <p className="text-sm text-gray-400">{rate.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-white">${rate.price.toLocaleString()}</p>
                <div className={`flex items-center gap-1 text-sm ${
                  rate.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {rate.change24h >= 0 ? (
                    <TrendingUp size={12} />
                  ) : (
                    <TrendingDown size={12} />
                  )}
                  {Math.abs(rate.change24h)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoRatesCard;
