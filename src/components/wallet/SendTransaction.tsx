
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, ArrowLeft } from 'lucide-react';

export const SendTransaction = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [gasPrice, setGasPrice] = useState('20');
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    setIsSending(true);
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsSending(false);
    setIsConfirming(false);
    setRecipient('');
    setAmount('');
  };

  const estimatedFee = (parseFloat(gasPrice) * 21000 / 1e9).toFixed(6);
  const totalCost = amount ? (parseFloat(amount) + parseFloat(estimatedFee)).toFixed(6) : '0';

  if (isConfirming) {
    return (
      <Card className="card-glass max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsConfirming(false)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle>Confirm Transaction</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-infi-dark-blue/50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">To:</span>
              <span className="font-mono text-sm">{recipient.slice(0, 6)}...{recipient.slice(-4)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Amount:</span>
              <span className="font-bold">{amount} ETH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Gas Fee:</span>
              <span>{estimatedFee} ETH</span>
            </div>
            <div className="border-t border-infi-gold/20 pt-3 flex justify-between">
              <span className="text-gray-400">Total:</span>
              <span className="font-bold text-infi-gold">{totalCost} ETH</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsConfirming(false)}
              className="flex-1 border-infi-gold/50"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSend}
              disabled={isSending}
              className="flex-1 gold-gradient"
            >
              {isSending ? 'Sending...' : 'Confirm'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-glass max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5 text-infi-gold" />
          Send Transaction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Recipient Address</label>
          <Input
            placeholder="0x..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="bg-infi-dark border-infi-gold/20"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Amount (ETH)</label>
          <Input
            type="number"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-infi-dark border-infi-gold/20"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>Available: 2.5 ETH</span>
            <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
              Max
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Gas Price (Gwei)</label>
          <div className="flex gap-2">
            <Button 
              variant={gasPrice === '15' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setGasPrice('15')}
              className={gasPrice === '15' ? 'gold-gradient' : 'border-infi-gold/50'}
            >
              Slow (15)
            </Button>
            <Button 
              variant={gasPrice === '20' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setGasPrice('20')}
              className={gasPrice === '20' ? 'gold-gradient' : 'border-infi-gold/50'}
            >
              Standard (20)
            </Button>
            <Button 
              variant={gasPrice === '30' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setGasPrice('30')}
              className={gasPrice === '30' ? 'gold-gradient' : 'border-infi-gold/50'}
            >
              Fast (30)
            </Button>
          </div>
        </div>

        {amount && recipient && (
          <div className="bg-infi-dark-blue/50 p-3 rounded-lg space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Estimated Fee:</span>
              <span>{estimatedFee} ETH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Cost:</span>
              <span className="font-bold text-infi-gold">{totalCost} ETH</span>
            </div>
          </div>
        )}

        <Button 
          onClick={() => setIsConfirming(true)}
          disabled={!recipient || !amount}
          className="w-full gold-gradient"
        >
          Review Transaction
        </Button>
      </CardContent>
    </Card>
  );
};
