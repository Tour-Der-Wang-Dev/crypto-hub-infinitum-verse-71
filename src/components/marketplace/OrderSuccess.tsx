
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

interface OrderSuccessProps {
  orderId: string;
  onViewOrders: () => void;
  onContinueShopping: () => void;
}

export const OrderSuccess = ({ 
  orderId, 
  onViewOrders, 
  onContinueShopping 
}: OrderSuccessProps) => {
  return (
    <Card className="card-glass max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-green-400" />
        </div>
        <CardTitle className="text-green-400">Order Successful!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <p className="text-gray-300">Your order has been confirmed</p>
          <div className="bg-infi-dark-blue/50 p-3 rounded-lg">
            <span className="text-sm text-gray-400">Order ID: </span>
            <span className="font-mono text-infi-gold">{orderId}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Button onClick={onViewOrders} className="w-full gold-gradient">
            View My Orders
          </Button>
          <Button 
            onClick={onContinueShopping} 
            variant="outline" 
            className="w-full border-infi-gold/50 text-infi-gold-light hover:bg-infi-gold/10"
          >
            Continue Shopping
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
