
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CheckoutFormProps {
  total: number;
  onSubmit: (data: any) => void;
}

export const CheckoutForm = ({ total, onSubmit }: CheckoutFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    walletAddress: '',
    paymentMethod: 'BTC',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="card-glass">
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Wallet Address</label>
            <Input
              value={formData.walletAddress}
              onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Payment Method</label>
            <select
              className="w-full px-4 py-2 rounded-md bg-infi-dark border border-infi-gold/20"
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
            >
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="USDT">Tether (USDT)</option>
            </select>
          </div>

          <div className="pt-4 border-t border-infi-gold/20">
            <p className="text-lg font-bold">Total: ${total}</p>
          </div>

          <Button type="submit" className="w-full gold-gradient">
            Complete Purchase
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
