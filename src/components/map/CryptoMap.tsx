
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, Filter } from 'lucide-react';

interface CryptoLocation {
  id: string;
  name: string;
  type: 'ATM' | 'Store' | 'Exchange';
  address: string;
  lat: number;
  lng: number;
  acceptedCoins: string[];
}

const CryptoMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [locations] = useState<CryptoLocation[]>([
    {
      id: '1',
      name: 'Bitcoin ATM Central',
      type: 'ATM',
      address: '123 Main St, Bangkok',
      lat: 13.7563,
      lng: 100.5018,
      acceptedCoins: ['BTC', 'ETH']
    },
    {
      id: '2',
      name: 'Crypto Coffee Shop',
      type: 'Store',
      address: '456 Sukhumvit Rd, Bangkok',
      lat: 13.7462,
      lng: 100.5348,
      acceptedCoins: ['BTC', 'ETH', 'USDT']
    },
    {
      id: '3',
      name: 'Digital Exchange Hub',
      type: 'Exchange',
      address: '789 Silom Rd, Bangkok',
      lat: 13.7251,
      lng: 100.5330,
      acceptedCoins: ['BTC', 'ETH', 'BNB', 'SOL', 'USDT']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || location.type === selectedType;
    return matchesSearch && matchesType;
  });

  useEffect(() => {
    if (!mapContainer.current) return;

    // For now, we'll show a placeholder map
    // In production, this would initialize Mapbox GL JS
    const mapElement = mapContainer.current;
    mapElement.innerHTML = `
      <div class="w-full h-full bg-gradient-to-br from-infi-dark-blue to-infi-dark rounded-lg flex items-center justify-center">
        <div class="text-center">
          <div class="text-4xl mb-4">🗺️</div>
          <p class="text-infi-gold font-medium">Interactive Crypto Map</p>
          <p class="text-gray-400 text-sm mt-2">Mapbox integration would be initialized here</p>
        </div>
      </div>
    `;
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Map Container */}
      <div className="lg:col-span-2">
        <Card className="card-glass h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-infi-gold">
              <MapPin size={20} />
              Crypto Payment Locations
            </CardTitle>
          </CardHeader>
          <CardContent className="h-96 lg:h-[500px]">
            <div ref={mapContainer} className="w-full h-full rounded-lg"></div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Search and Filters */}
        <Card className="card-glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-infi-gold">
              <Search size={20} />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search locations..."
                className="pl-10 bg-infi-dark-blue/80 border-infi-gold/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-300">Location Type</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={selectedType === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('all')}
                  className={selectedType === 'all' ? 'gold-gradient' : 'border-infi-gold/30'}
                >
                  All
                </Button>
                <Button
                  variant={selectedType === 'ATM' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('ATM')}
                  className={selectedType === 'ATM' ? 'gold-gradient' : 'border-infi-gold/30'}
                >
                  ATMs
                </Button>
                <Button
                  variant={selectedType === 'Store' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('Store')}
                  className={selectedType === 'Store' ? 'gold-gradient' : 'border-infi-gold/30'}
                >
                  Stores
                </Button>
                <Button
                  variant={selectedType === 'Exchange' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('Exchange')}
                  className={selectedType === 'Exchange' ? 'gold-gradient' : 'border-infi-gold/30'}
                >
                  Exchanges
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Locations List */}
        <Card className="card-glass">
          <CardHeader>
            <CardTitle className="text-infi-gold">Nearby Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {filteredLocations.map((location) => (
                <div key={location.id} className="border border-infi-gold/20 rounded-lg p-4 hover:bg-infi-gold/5 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-white">{location.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      location.type === 'ATM' ? 'bg-blue-500/20 text-blue-300' :
                      location.type === 'Store' ? 'bg-green-500/20 text-green-300' :
                      'bg-purple-500/20 text-purple-300'
                    }`}>
                      {location.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{location.address}</p>
                  <div className="flex flex-wrap gap-1">
                    {location.acceptedCoins.map((coin) => (
                      <span key={coin} className="text-xs bg-infi-gold/20 text-infi-gold px-2 py-1 rounded">
                        {coin}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CryptoMap;
