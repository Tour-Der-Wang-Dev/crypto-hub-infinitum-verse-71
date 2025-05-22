
import React from 'react';
import { Star, Clock, Users, Bitcoin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExperienceResultsProps {
  searchParams: {
    location: string;
    date: string;
    category: string;
  }
}

const ExperienceResults: React.FC<ExperienceResultsProps> = ({ searchParams }) => {
  // Mock experiences data that would normally come from an API
  const mockExperiences = [
    {
      id: 'exp-001',
      title: 'Guided Blockchain Museum Tour',
      image: 'https://images.unsplash.com/photo-1594970452877-b58a35401337?auto=format&fit=crop&q=80&w=300&h=200',
      rating: 4.8,
      reviews: 124,
      duration: '2 hours',
      groupSize: 'Up to 10 people',
      price: 0.005,
      currency: 'BTC',
      category: 'culture'
    },
    {
      id: 'exp-002',
      title: 'Crypto Cooking Class',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745adc4b?auto=format&fit=crop&q=80&w=300&h=200',
      rating: 4.7,
      reviews: 89,
      duration: '3 hours',
      groupSize: 'Up to 8 people',
      price: 0.008,
      currency: 'BTC',
      category: 'food'
    },
    {
      id: 'exp-003',
      title: 'Virtual Reality Adventure',
      image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=300&h=200',
      rating: 4.9,
      reviews: 203,
      duration: '1 hour',
      groupSize: 'Up to 4 people',
      price: 0.007,
      currency: 'BTC',
      category: 'adventure'
    }
  ];

  // Filter based on category if not 'all'
  const filteredExperiences = searchParams.category === 'all' 
    ? mockExperiences 
    : mockExperiences.filter(exp => exp.category === searchParams.category);

  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-lg font-semibold mb-4">Available Experiences {searchParams.location && `in ${searchParams.location}`}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiences.map((experience) => (
          <div 
            key={experience.id} 
            className="bg-infi-dark-blue/60 border border-infi-gold/10 rounded-lg overflow-hidden hover:border-infi-gold/30 transition-all flex flex-col h-full"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={experience.image} 
                alt={experience.title} 
                className="w-full h-full object-cover"
                loading="lazy" // Add lazy loading for images
              />
            </div>
            
            <div className="p-4 flex flex-col flex-grow">
              <h4 className="text-lg font-medium mb-2">{experience.title}</h4>
              
              <div className="flex items-center mb-3">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="ml-1 text-sm">{experience.rating}</span>
                <span className="mx-1 text-gray-500">•</span>
                <span className="text-sm text-gray-400">{experience.reviews} reviews</span>
              </div>
              
              <div className="space-y-2 mb-4 text-sm text-gray-300">
                <div className="flex items-center">
                  <Clock size={14} className="mr-2" />
                  {experience.duration}
                </div>
                <div className="flex items-center">
                  <Users size={14} className="mr-2" />
                  {experience.groupSize}
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-infi-gold/10 flex items-center justify-between">
                <div className="flex items-center">
                  <Bitcoin size={16} className="text-infi-gold" />
                  <span className="ml-1 text-lg font-bold text-infi-gold">{experience.price}</span>
                  <span className="ml-1 text-sm text-gray-400">per person</span>
                </div>
                
                <Button variant="outline" className="border-infi-gold/30 text-infi-gold-light hover:bg-infi-gold/10">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredExperiences.length === 0 && (
        <div className="text-center py-6">
          <p className="text-gray-400">No experiences found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ExperienceResults;
