
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock } from 'lucide-react';

interface PaymentConfirmationProps {
  transactionId: string;
  amount: number;
  currency: string;
  onContinue: () => void;
}

export const PaymentConfirmation = ({ 
  transactionId, 
  amount, 
  currency, 
  onContinue 
}: PaymentConfirmationProps) => {
  return (
    <Card className="card-glass max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-400" />
        </div>
        <CardTitle>Payment Initiated</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <p className="text-gray-300">Your payment is being processed</p>
          <div className="flex items-center justify-center gap-2 text-yellow-400">
            <Clock className="h-4 w-4" />
            <span>Awaiting confirmation</span>
          </div>
        </div>

        <div className="bg-infi-dark-blue/50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Amount:</span>
            <span>{amount} {currency}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Transaction ID:</span>
            <span className="text-xs font-mono">{transactionId}</span>
          </div>
        </div>

        <Button onClick={onContinue} className="w-full gold-gradient">
          Continue Shopping
        </Button>
      </CardContent>
    </Card>
  );
};
