
import React, { useState, Suspense, lazy } from 'react';
import { Search, Plane, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Lazy load non-critical components
const FlightResults = lazy(() => import('@/components/travel/FlightResults'));

const FlightsTab = () => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: '1',
    class: 'economy'
  });
  const [hasSearched, setHasSearched] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    // Here you would typically fetch flight data
    console.log('Searching for flights with params:', searchParams);
  };

  return (
    <div className="card-glass p-6 rounded-lg">
      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* From & To Fields */}
          <div className="space-y-2">
            <Label htmlFor="from" className="text-sm font-medium">From</Label>
            <div className="relative">
              <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="from"
                name="from"
                placeholder="Departure City or Airport"
                className="pl-10 bg-infi-dark border border-infi-gold/20 focus:border-infi-gold"
                value={searchParams.from}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="to" className="text-sm font-medium">To</Label>
            <div className="relative">
              <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 rotate-90" size={18} />
              <Input
                id="to"
                name="to"
                placeholder="Destination City or Airport"
                className="pl-10 bg-infi-dark border border-infi-gold/20 focus:border-infi-gold"
                value={searchParams.to}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          {/* Date Fields */}
          <div className="space-y-2">
            <Label htmlFor="departDate" className="text-sm font-medium">Departure Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="departDate"
                name="departDate"
                type="date"
                className="pl-10 bg-infi-dark border border-infi-gold/20 focus:border-infi-gold"
                value={searchParams.departDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="returnDate" className="text-sm font-medium">Return Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="returnDate"
                name="returnDate"
                type="date"
                className="pl-10 bg-infi-dark border border-infi-gold/20 focus:border-infi-gold"
                value={searchParams.returnDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          {/* Passengers & Class */}
          <div className="space-y-2">
            <Label htmlFor="passengers" className="text-sm font-medium">Passengers</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Select 
                value={searchParams.passengers} 
                onValueChange={(value) => handleSelectChange('passengers', value)}
              >
                <SelectTrigger className="pl-10 bg-infi-dark border border-infi-gold/20 focus:border-infi-gold">
                  <SelectValue placeholder="Select number of passengers" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num} Passenger{num > 1 ? 's' : ''}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="class" className="text-sm font-medium">Class</Label>
            <Select 
              value={searchParams.class} 
              onValueChange={(value) => handleSelectChange('class', value)}
            >
              <SelectTrigger className="bg-infi-dark border border-infi-gold/20 focus:border-infi-gold">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">Economy</SelectItem>
                <SelectItem value="premium">Premium Economy</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="first">First Class</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button type="submit" className="w-full gold-gradient">
          <Search size={18} className="mr-2" />
          Search Flights
        </Button>
      </form>

      {hasSearched && (
        <Suspense fallback={<div className="mt-6 text-center py-8">Loading flight results...</div>}>
          <FlightResults searchParams={searchParams} />
        </Suspense>
      )}
    </div>
  );
};

export default FlightsTab;
