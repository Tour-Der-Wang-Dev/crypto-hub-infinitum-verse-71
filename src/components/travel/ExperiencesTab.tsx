
import React, { useState, Suspense, lazy } from 'react';
import { Search, MapPin, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Lazy load the results component
const ExperienceResults = lazy(() => import('@/components/travel/ExperienceResults'));

const ExperiencesTab = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    date: '',
    category: 'all',
  });
  const [hasSearched, setHasSearched] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    console.log('Searching for experiences with params:', searchParams);
  };

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'culture', name: 'Cultural' },
    { id: 'food', name: 'Food & Drink' },
    { id: 'wellness', name: 'Wellness' },
    { id: 'nightlife', name: 'Nightlife' }
  ];

  return (
    <div className="card-glass p-6 rounded-lg">
      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Location Field */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">Destination</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="location"
                name="location"
                placeholder="Where are you going?"
                className="pl-10 bg-infi-dark border border-infi-gold/20 focus:border-infi-gold"
                value={searchParams.location}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          {/* Date Field */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium">Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="date"
                name="date"
                type="date"
                className="pl-10 bg-infi-dark border border-infi-gold/20 focus:border-infi-gold"
                value={searchParams.date}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">Category</Label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                id="category"
                name="category"
                className="w-full pl-10 h-10 rounded-md bg-infi-dark border border-infi-gold/20 focus:border-infi-gold focus:ring-infi-gold focus:outline-none"
                value={searchParams.category}
                onChange={(e) => setSearchParams(prev => ({ ...prev, category: e.target.value }))}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <Button type="submit" className="w-full gold-gradient">
          <Search size={18} className="mr-2" />
          Search Experiences
        </Button>
      </form>

      {hasSearched && (
        <Suspense fallback={<div className="mt-6 text-center py-8">Loading experiences...</div>}>
          <ExperienceResults searchParams={searchParams} />
        </Suspense>
      )}
    </div>
  );
};

export default ExperiencesTab;
