import { Rental } from '@/data/rentals';
import RentalCard from './RentalCard';

interface RentalGridProps {
  rentals: Rental[];
}

export default function RentalGrid({ rentals }: RentalGridProps) {
  if (rentals.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-100 rounded-full h-24 w-24 mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl">🌿</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No rentals found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria to find the perfect rental for your needs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {rentals.map((rental) => (
        <RentalCard key={rental.id} rental={rental} />
      ))}
    </div>
  );
} 