
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Check } from 'lucide-react';

interface Network {
  id: number;
  name: string;
  symbol: string;
  rpcUrl: string;
  icon: string;
  color: string;
}

export const NetworkSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<Network>({
    id: 1,
    name: 'Ethereum Mainnet',
    symbol: 'ETH',
    rpcUrl: 'https://mainnet.infura.io',
    icon: 'Ξ',
    color: 'bg-blue-500'
  });

  const networks: Network[] = [
    {
      id: 1,
      name: 'Ethereum Mainnet',
      symbol: 'ETH',
      rpcUrl: 'https://mainnet.infura.io',
      icon: 'Ξ',
      color: 'bg-blue-500'
    },
    {
      id: 56,
      name: 'Binance Smart Chain',
      symbol: 'BNB',
      rpcUrl: 'https://bsc-dataseed.binance.org',
      icon: '🔶',
      color: 'bg-yellow-500'
    },
    {
      id: 137,
      name: 'Polygon',
      symbol: 'MATIC',
      rpcUrl: 'https://rpc-mainnet.maticvigil.com',
      icon: '🟣',
      color: 'bg-purple-500'
    },
    {
      id: 43114,
      name: 'Avalanche',
      symbol: 'AVAX',
      rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
      icon: '🔺',
      color: 'bg-red-500'
    }
  ];

  const handleNetworkSelect = (network: Network) => {
    setSelectedNetwork(network);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between border-infi-gold/50 text-infi-gold-light hover:bg-infi-gold/10"
      >
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${selectedNetwork.color}`} />
          <span className="text-lg">{selectedNetwork.icon}</span>
          <span>{selectedNetwork.name}</span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 card-glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Select Network</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1">
              {networks.map((network) => (
                <button
                  key={network.id}
                  onClick={() => handleNetworkSelect(network)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-infi-dark-blue/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${network.color}`} />
                    <span className="text-lg">{network.icon}</span>
                    <div className="text-left">
                      <p className="font-medium">{network.name}</p>
                      <p className="text-xs text-gray-400">{network.symbol}</p>
                    </div>
                  </div>
                  {selectedNetwork.id === network.id && (
                    <Check className="h-4 w-4 text-infi-gold" />
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
