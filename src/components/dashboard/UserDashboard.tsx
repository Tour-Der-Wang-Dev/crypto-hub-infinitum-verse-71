
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Wallet, MapPin, ShoppingBag, Briefcase, Plane } from 'lucide-react';
import CryptoRatesCard from '@/components/crypto/CryptoRatesCard';
import WeatherDisplay from '@/components/weather/WeatherDisplay';

const UserDashboard = () => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    walletAddress: '0x1234...5678',
    joinDate: '2024-01-15'
  });

  const [activities] = useState([
    { id: 1, type: 'marketplace', description: 'Purchased Blockchain Security Suite', date: '2024-05-20', amount: '0.05 BTC' },
    { id: 2, type: 'freelance', description: 'Hired Smart Contract Developer', date: '2024-05-18', amount: '0.15 ETH' },
    { id: 3, type: 'travel', description: 'Booked Hotel in Bangkok', date: '2024-05-15', amount: '0.02 BTC' },
  ]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Dashboard</h1>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Welcome back, {user.name}! Manage your crypto activities and explore new opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* User Profile Card */}
          <Card className="card-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-infi-gold">
                <User size={20} />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Name</p>
                <p className="text-white font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Wallet</p>
                <p className="text-white font-medium font-mono">{user.walletAddress}</p>
              </div>
              <Button className="gold-gradient w-full">
                <Wallet size={16} className="mr-2" />
                Manage Wallet
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-4">
            <Card className="card-glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-infi-gold">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Spent</span>
                  <span className="text-white font-medium">0.22 BTC</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Transactions</span>
                  <span className="text-white font-medium">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Member Since</span>
                  <span className="text-white font-medium">{user.joinDate}</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Weather Widget */}
            <WeatherDisplay />
          </div>

          {/* Crypto Rates */}
          <CryptoRatesCard />
        </div>

        {/* Activity Tabs */}
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-infi-dark-blue/50">
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            <TabsTrigger value="marketplace">
              <ShoppingBag size={16} className="mr-1" />
              Marketplace
            </TabsTrigger>
            <TabsTrigger value="freelance">
              <Briefcase size={16} className="mr-1" />
              Freelance
            </TabsTrigger>
            <TabsTrigger value="travel">
              <Plane size={16} className="mr-1" />
              Travel
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="mt-6">
            <Card className="card-glass">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between border-b border-infi-gold/20 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-infi-gold/20 flex items-center justify-center">
                          {activity.type === 'marketplace' && <ShoppingBag size={16} />}
                          {activity.type === 'freelance' && <Briefcase size={16} />}
                          {activity.type === 'travel' && <Plane size={16} />}
                        </div>
                        <div>
                          <p className="text-white font-medium">{activity.description}</p>
                          <p className="text-sm text-gray-400">{activity.date}</p>
                        </div>
                      </div>
                      <span className="text-infi-gold font-medium">{activity.amount}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketplace" className="mt-6">
            <Card className="card-glass">
              <CardContent className="text-center py-8">
                <ShoppingBag size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400">No marketplace purchases yet</p>
                <Button className="gold-gradient mt-4">Browse Marketplace</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="freelance" className="mt-6">
            <Card className="card-glass">
              <CardContent className="text-center py-8">
                <Briefcase size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400">No freelance projects yet</p>
                <Button className="gold-gradient mt-4">Find Freelancers</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="travel" className="mt-6">
            <Card className="card-glass">
              <CardContent className="text-center py-8">
                <Plane size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-400">No travel bookings yet</p>
                <Button className="gold-gradient mt-4">Plan Your Trip</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserDashboard;
