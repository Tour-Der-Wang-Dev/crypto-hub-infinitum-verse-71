
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Store, DollarSign, Activity } from 'lucide-react';
import WeatherDisplay from '@/components/WeatherDisplay';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Users', value: '2,847', icon: Users, change: '+12%' },
    { title: 'Active Stores', value: '156', icon: Store, change: '+8%' },
    { title: 'Daily Volume', value: '$45.2K', icon: DollarSign, change: '+15%' },
    { title: 'Transactions', value: '1,234', icon: Activity, change: '+5%' },
  ];

  const recentUsers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'verified' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'pending' },
    { id: 3, name: 'Carol Davis', email: 'carol@example.com', status: 'verified' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-infi-dark via-infi-dark-blue to-infi-dark text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
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
                    <p className="text-green-400 text-sm mt-1">{stat.change}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-infi-gold" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Users */}
        <Card className="card-glass">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-infi-dark-blue/30">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                  <Badge variant={user.status === 'verified' ? 'default' : 'secondary'}>
                    {user.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button className="gold-gradient">Manage Users</Button>
          <Button variant="outline" className="border-infi-gold/50 text-infi-gold-light hover:bg-infi-gold/10">
            View Analytics
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
