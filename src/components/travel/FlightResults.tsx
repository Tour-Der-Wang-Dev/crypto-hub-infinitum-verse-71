
import React from 'react';
import { Clock, Plane, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FlightResultsProps {
  searchParams: {
    from: string;
    to: string;
    departDate: string;
    returnDate: string;
    passengers: string;
    class: string;
  }
}

const FlightResults: React.FC<FlightResultsProps> = ({ searchParams }) => {
  // Mock flight data that would normally come from an API
  const mockFlights = [
    {
      id: 'fl-001',
      airline: 'InfiAir',
      departureTime: '08:30',
      arrivalTime: '10:45',
      duration: '2h 15m',
      price: 0.015,
      currency: 'BTC',
      stops: 0
    },
    {
      id: 'fl-002',
      airline: 'CryptoJet',
      departureTime: '12:15',
      arrivalTime: '14:50',
      duration: '2h 35m',
      price: 0.012,
      currency: 'BTC',
      stops: 1
    },
    {
      id: 'fl-003',
      airline: 'BlockchainAir',
      departureTime: '16:40',
      arrivalTime: '19:10',
      duration: '2h 30m',
      price: 0.018,
      currency: 'BTC',
      stops: 0
    }
  ];

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-lg font-semibold mb-4">Available Flights</h3>
      
      {mockFlights.map((flight) => (
        <div 
          key={flight.id} 
          className="bg-infi-dark-blue/60 border border-infi-gold/10 rounded-lg p-4 hover:border-infi-gold/30 transition-all"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-400">{flight.airline}</span>
              <div className="flex items-center mt-1">
                <span className="text-lg font-semibold">{flight.departureTime}</span>
                <div className="mx-2 flex items-center">
                  <div className="h-[1px] w-10 bg-gray-500"></div>
                  <Plane size={14} className="mx-1 rotate-90" />
                  <div className="h-[1px] w-10 bg-gray-500"></div>
                </div>
                <span className="text-lg font-semibold">{flight.arrivalTime}</span>
              </div>
              <div className="flex items-center mt-1 text-sm text-gray-400">
                <Clock size={14} className="mr-1" />
                {flight.duration} • {flight.stops === 0 ? 'Direct' : `${flight.stops} stop`}
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <DollarSign size={16} className="text-infi-gold" />
                <span className="text-xl font-bold text-infi-gold">{flight.price} {flight.currency}</span>
              </div>
              <span className="text-sm text-gray-400">Per person</span>
              <Button className="gold-gradient mt-2">
                Select
              </Button>
            </div>
          </div>
        </div>
      ))}
      
      <div className="text-center text-sm text-gray-400 pt-4">
        Showing results for {searchParams.from} to {searchParams.to} on {searchParams.departDate}
        {searchParams.returnDate && ` with return on ${searchParams.returnDate}`}
      </div>
    </div>
  );
};

export default FlightResults;
