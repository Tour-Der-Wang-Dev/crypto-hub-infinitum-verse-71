
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, Copy, ExternalLink } from 'lucide-react';
import { useWeb3 } from '@/contexts/Web3Context';

export const WalletConnector = () => {
  const { account, isConnected, balance, connect, disconnect } = useWeb3();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
    }
  };

  if (!isConnected) {
    return (
      <Card className="card-glass max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-infi-gold/20 rounded-full flex items-center justify-center">
            <Wallet className="h-8 w-8 text-infi-gold" />
          </div>
          <CardTitle>Connect Your Wallet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-400">
            Connect your wallet to access all InfiWorld features
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full gold-gradient"
            >
              {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
            </Button>
            
            <Button variant="outline" className="w-full border-infi-gold/50 text-infi-gold-light hover:bg-infi-gold/10">
              WalletConnect
            </Button>
            
            <Button variant="outline" className="w-full border-infi-gold/50 text-infi-gold-light hover:bg-infi-gold/10">
              Coinbase Wallet
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-glass max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-infi-gold" />
            Wallet Connected
          </CardTitle>
          <Badge variant="default" className="bg-green-500/20 text-green-400">
            Connected
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-infi-dark-blue/50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Address:</span>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={copyAddress}>
                <Copy className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <p className="font-mono text-sm break-all">{account}</p>
        </div>

        <div className="bg-infi-dark-blue/50 p-4 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">Balance</p>
            <p className="text-2xl font-bold text-infi-gold">{balance} ETH</p>
            <p className="text-sm text-gray-400">≈ $3,125.00</p>
          </div>
        </div>

        <div className="space-y-2">
          <Button className="w-full gold-gradient">
            Send Transaction
          </Button>
          <Button 
            variant="outline" 
            onClick={disconnect}
            className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
