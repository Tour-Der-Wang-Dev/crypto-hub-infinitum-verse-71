
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUpDown, Settings } from 'lucide-react';

interface Token {
  symbol: string;
  name: string;
  balance: string;
  icon: string;
}

export const TokenSwap = () => {
  const [fromToken, setFromToken] = useState<Token>({
    symbol: 'ETH',
    name: 'Ethereum',
    balance: '2.5',
    icon: 'Ξ'
  });
  
  const [toToken, setToToken] = useState<Token>({
    symbol: 'USDT',
    name: 'Tether',
    balance: '1250.0',
    icon: '₮'
  });
  
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');

  const handleSwap = () => {
    // Swap the tokens
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    
    // Clear amounts
    setFromAmount('');
    setToAmount('');
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    // Mock conversion rate
    if (value) {
      const rate = fromToken.symbol === 'ETH' ? 2500 : 0.0004;
      setToAmount((parseFloat(value) * rate).toFixed(6));
    } else {
      setToAmount('');
    }
  };

  return (
    <Card className="card-glass max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Token Swap</CardTitle>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* From Token */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">From</label>
          <div className="relative">
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              className="pr-20 bg-infi-dark border-infi-gold/20"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <span className="text-lg">{fromToken.icon}</span>
              <span className="font-medium">{fromToken.symbol}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400">Balance: {fromToken.balance} {fromToken.symbol}</p>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="icon"
            onClick={handleSwap}
            className="border-infi-gold/50 text-infi-gold hover:bg-infi-gold/10"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        {/* To Token */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">To</label>
          <div className="relative">
            <Input
              type="number"
              placeholder="0.0"
              value={toAmount}
              readOnly
              className="pr-20 bg-infi-dark border-infi-gold/20"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <span className="text-lg">{toToken.icon}</span>
              <span className="font-medium">{toToken.symbol}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400">Balance: {toToken.balance} {toToken.symbol}</p>
        </div>

        {/* Swap Details */}
        {fromAmount && toAmount && (
          <div className="bg-infi-dark-blue/50 p-3 rounded-lg space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Rate:</span>
              <span>1 {fromToken.symbol} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6)} {toToken.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Slippage:</span>
              <span>{slippage}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Gas Fee:</span>
              <span>~$12.50</span>
            </div>
          </div>
        )}

        <Button 
          className="w-full gold-gradient"
          disabled={!fromAmount || !toAmount}
        >
          {!fromAmount ? 'Enter Amount' : 'Swap Tokens'}
        </Button>
      </CardContent>
    </Card>
  );
};
