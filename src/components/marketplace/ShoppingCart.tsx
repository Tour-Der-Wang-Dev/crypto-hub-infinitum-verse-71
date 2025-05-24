
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

const ShoppingCart = () => {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      // In a real app, redirect to success page
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <Card className="card-glass">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
          <p className="text-gray-400">Add some items to get started!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="card-glass">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Shopping Cart ({totalItems} items)</CardTitle>
            <Button 
              variant="outline" 
              onClick={clearCart}
              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              Clear Cart
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.title} className="flex items-center gap-4 p-4 border border-infi-gold/20 rounded-lg">
                <div className="w-16 h-16 bg-infi-dark-blue/50 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">{item.emoji || '📦'}</span>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.seller}</p>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.title, item.quantity - 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.title, item.quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="text-right">
                  <p className="font-medium text-infi-gold">{item.price}</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeItem(item.title)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card className="card-glass">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal ({totalItems} items)</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-400">Free</span>
            </div>
            <div className="border-t border-infi-gold/20 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-infi-gold">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full gold-gradient"
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingCart;
