
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CryptoRatesCard from '@/components/crypto/CryptoRatesCard';
import WeatherDisplay from '@/components/WeatherDisplay';
import { ShoppingBag, Briefcase, MapPin, Calendar } from 'lucide-react';

const UserDashboard = () => {
  const stats = [
    { title: 'Orders', value: '12', icon: ShoppingBag },
    { title: 'Projects', value: '3', icon: Briefcase },
    { title: 'Locations Visited', value: '8', icon: MapPin },
    { title: 'Bookings', value: '2', icon: Calendar },
  ];

  const recentActivity = [
    { type: 'order', description: 'Purchased Crypto Hardware Wallet', date: '2 days ago', status: 'completed' },
    { type: 'booking', description: 'Hotel reservation in Bangkok', date: '1 week ago', status: 'confirmed' },
    { type: 'project', description: 'Smart Contract Development', date: '2 weeks ago', status: 'in-progress' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-infi-dark via-infi-dark-blue to-infi-dark text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <WeatherDisplay />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="card-glass">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-infi-gold" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="card-glass">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-infi-dark-blue/30">
                    <div>
                      <p className="font-medium">{activity.description}</p>
                      <p className="text-gray-400 text-sm">{activity.date}</p>
                    </div>
                    <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Crypto Rates */}
          <CryptoRatesCard />
        </div>

        {/* Quick Actions */}
        <Card className="card-glass">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="gold-gradient">Browse Marketplace</Button>
              <Button variant="outline" className="border-infi-gold/50 text-infi-gold-light hover:bg-infi-gold/10">
                Find Freelancers
              </Button>
              <Button variant="outline" className="border-infi-gold/50 text-infi-gold-light hover:bg-infi-gold/10">
                Plan Travel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
