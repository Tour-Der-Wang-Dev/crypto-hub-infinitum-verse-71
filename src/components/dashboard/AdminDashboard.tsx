
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Users, Store, Activity, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SecurityMonitor from '@/components/security/SecurityMonitor';

const AdminDashboard = () => {
  const [stats] = useState({
    users: { total: 1245, growth: 5.2, new: 38 },
    stores: { total: 432, growth: -1.8, new: 12 },
    transactions: { total: 3298, growth: 12.5, amount: '152.34 BTC' }
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-gray-300 max-w-3xl">
            Monitor system performance, manage users, and track crypto transactions.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="card-glass">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Users className="text-infi-gold h-5 w-5" />
                  <span className="text-2xl font-bold">{stats.users.total}</span>
                </div>
                <div className={`flex items-center ${stats.users.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stats.users.growth >= 0 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  <span className="text-sm">{Math.abs(stats.users.growth)}%</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-2">+{stats.users.new} this week</p>
            </CardContent>
          </Card>

          <Card className="card-glass">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Crypto Stores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Store className="text-infi-gold h-5 w-5" />
                  <span className="text-2xl font-bold">{stats.stores.total}</span>
                </div>
                <div className={`flex items-center ${stats.stores.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stats.stores.growth >= 0 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  <span className="text-sm">{Math.abs(stats.stores.growth)}%</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-2">+{stats.stores.new} this week</p>
            </CardContent>
          </Card>

          <Card className="card-glass">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Activity className="text-infi-gold h-5 w-5" />
                  <span className="text-2xl font-bold">{stats.transactions.total}</span>
                </div>
                <div className={`flex items-center ${stats.transactions.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stats.transactions.growth >= 0 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  <span className="text-sm">{Math.abs(stats.transactions.growth)}%</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-2">{stats.transactions.amount} processed</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="overview">
          <TabsList className="bg-infi-dark-blue/50 w-full md:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Transaction Activity Chart */}
              <Card className="card-glass">
                <CardHeader>
                  <CardTitle>Transaction Activity</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="w-full h-full bg-gradient-to-br from-infi-dark-blue/50 to-infi-dark rounded-lg flex items-center justify-center">
                    <p className="text-infi-gold">Chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="card-glass">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Activity</CardTitle>
                  <Button variant="outline" size="sm" className="border-infi-gold/30 text-infi-gold">
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="flex justify-between border-b border-infi-gold/20 pb-3">
                        <div>
                          <p className="font-medium">New verification request</p>
                          <p className="text-sm text-gray-400">User #1234 submitted documents</p>
                        </div>
                        <p className="text-xs text-gray-400">10 mins ago</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <Card className="card-glass">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">User management functionality will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations" className="mt-6">
            <Card className="card-glass">
              <CardHeader>
                <CardTitle>Crypto Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Location management functionality will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SecurityMonitor showDetails={true} />
              </div>
              <Card className="card-glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="text-infi-gold" size={18} />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-infi-gold/20 pb-2">
                      <p>Two-factor Authentication</p>
                      <p className="text-infi-gold">Enabled</p>
                    </div>
                    <div className="flex justify-between items-center border-b border-infi-gold/20 pb-2">
                      <p>IP Restrictions</p>
                      <p className="text-infi-gold">Active</p>
                    </div>
                    <div className="flex justify-between items-center border-b border-infi-gold/20 pb-2">
                      <p>Last Security Scan</p>
                      <p className="text-gray-400">2 hours ago</p>
                    </div>
                    <Button className="gold-gradient w-full">
                      Update Security Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
