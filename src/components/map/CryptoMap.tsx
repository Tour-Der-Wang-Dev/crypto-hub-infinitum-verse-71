
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Bitcoin, Filter } from 'lucide-react';

interface CryptoLocation {
  id: number;
  name: string;
  type: 'store' | 'atm' | 'exchange';
  address: string;
  cryptocurrencies: string[];
  lat: number;
  lng: number;
  rating: number;
}

const CryptoMap = () => {
  const [locations, setLocations] = useState<CryptoLocation[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<CryptoLocation | null>(null);

  useEffect(() => {
    // Mock data for crypto locations
    const mockLocations: CryptoLocation[] = [
      {
        id: 1,
        name: 'Crypto Coffee Shop',
        type: 'store',
        address: '123 Blockchain Ave, Bangkok',
        cryptocurrencies: ['BTC', 'ETH', 'USDT'],
        lat: 13.7563,
        lng: 100.5018,
        rating: 4.5,
      },
      {
        id: 2,
        name: 'Bitcoin ATM - Central Plaza',
        type: 'atm',
        address: 'Central Plaza, Bangkok',
        cryptocurrencies: ['BTC'],
        lat: 13.7463,
        lng: 100.5318,
        rating: 4.2,
      },
      {
        id: 3,
        name: 'Digital Exchange Hub',
        type: 'exchange',
        address: '456 Crypto Street, Bangkok',
        cryptocurrencies: ['BTC', 'ETH', 'BNB', 'SOL'],
        lat: 13.7663,
        lng: 100.4918,
        rating: 4.8,
      },
    ];
    setLocations(mockLocations);
  }, []);

  const filteredLocations = filter === 'all' 
    ? locations 
    : locations.filter(loc => loc.type === filter);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'store': return '🏪';
      case 'atm': return '🏧';
      case 'exchange': return '🏛️';
      default: return '📍';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="card-glass">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'gold-gradient' : 'border-infi-gold/50 text-infi-gold-light hover:bg-infi-gold/10'}
            >
              <Filter className="h-4 w-4 mr-2" />
              All Locations
            </Button>
            <Button
              variant={filter === 'store' ? 'default' : 'outline'}
              onClick={() => setFilter('store')}
              className={filter === 'store' ? 'gold-gradient' : 'border-infi-gold/50 text-infi-gold-light hover:bg-infi-gold/10'}
            >
              Stores
            </Button>
            <Button
              variant={filter === 'atm' ? 'default' : 'outline'}
              onClick={() => setFilter('atm')}
              className={filter === 'atm' ? 'gold-gradient' : 'border-infi-gold/50 text-infi-gold-light hover:bg-infi-gold/10'}
            >
              ATMs
            </Button>
            <Button
              variant={filter === 'exchange' ? 'default' : 'outline'}
              onClick={() => setFilter('exchange')}
              className={filter === 'exchange' ? 'gold-gradient' : 'border-infi-gold/50 text-infi-gold-light hover:bg-infi-gold/10'}
            >
              Exchanges
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Placeholder */}
        <Card className="card-glass">
          <CardContent className="p-0">
            <div className="h-96 bg-infi-dark-blue/50 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-infi-gold mx-auto mb-2" />
                <p className="text-gray-300">Interactive Map</p>
                <p className="text-sm text-gray-400">Map integration coming soon</p>
              </div>
              
              {/* Mock map markers */}
              <div className="absolute inset-0 pointer-events-none">
                {filteredLocations.map((location, index) => (
                  <div
                    key={location.id}
                    className="absolute w-6 h-6 text-xl cursor-pointer pointer-events-auto"
                    style={{
                      left: `${20 + index * 25}%`,
                      top: `${30 + index * 15}%`,
                    }}
                    onClick={() => setSelectedLocation(location)}
                  >
                    {getTypeIcon(location.type)}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location List */}
        <Card className="card-glass">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-4">Crypto Locations ({filteredLocations.length})</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedLocation?.id === location.id
                      ? 'border-infi-gold bg-infi-gold/10'
                      : 'border-infi-gold/20 bg-infi-dark-blue/30 hover:border-infi-gold/40'
                  }`}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{getTypeIcon(location.type)}</span>
                        <h4 className="font-medium">{location.name}</h4>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{location.address}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {location.cryptocurrencies.map((crypto) => (
                          <span
                            key={crypto}
                            className="text-xs bg-infi-dark px-2 py-1 rounded-full border border-infi-gold/30 text-infi-gold-light"
                          >
                            {crypto}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-sm">{location.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selected Location Details */}
      {selectedLocation && (
        <Card className="card-glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl">{getTypeIcon(selectedLocation.type)}</span>
              <div>
                <h3 className="text-xl font-semibold">{selectedLocation.name}</h3>
                <p className="text-gray-400">{selectedLocation.address}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Accepted Cryptocurrencies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedLocation.cryptocurrencies.map((crypto) => (
                    <span
                      key={crypto}
                      className="bg-infi-dark px-3 py-1 rounded-full border border-infi-gold/30 text-infi-gold-light flex items-center gap-1"
                    >
                      <Bitcoin className="h-3 w-3" />
                      {crypto}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Actions</h4>
                <div className="space-y-2">
                  <Button className="w-full gold-gradient">Get Directions</Button>
                  <Button variant="outline" className="w-full border-infi-gold/50 text-infi-gold-light hover:bg-infi-gold/10">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CryptoMap;
