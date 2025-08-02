'use client';

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Search, Filter, Leaf, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { rentals, rentalCategories, rentalTypes } from '@/data/rentals';
import RentalGrid from '@/components/rentals/RentalGrid';

const ITEMS_PER_PAGE = 8;

export default function RentalsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter rentals based on search and filters
  const filteredRentals = useMemo(() => {
    return rentals.filter(rental => {
      const matchesSearch = rental.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rental.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rental.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || rental.category === selectedCategory;
      const matchesType = selectedType === 'all' || rental.type === selectedType;
      
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [searchTerm, selectedCategory, selectedType]);

  // Pagination
  const totalPages = Math.ceil(filteredRentals.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRentals = filteredRentals.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleTypeChange = (typeId: string) => {
    setSelectedType(typeId);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Plant & Tree Rentals</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transform your space with our premium plant and tree rental collection featuring {rentals.length} beautiful options 
          perfect for events, offices, and special occasions.
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6 shadow-lg border-0 bg-white/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Filters */}
            <div className="space-y-3">
              <p className="text-center text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
                <Leaf className="h-4 w-4" />
                Filter by Category
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {rentalCategories.map((category) => (
                  <Badge
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "secondary"}
                    className="cursor-pointer transition-all hover:scale-105"
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name} ({category.count})
                  </Badge>
                ))}
              </div>
            </div>

            {/* Type Filters */}
            <div className="space-y-3">
              <p className="text-center text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" />
                Filter by Type
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {rentalTypes.map((type) => (
                  <Badge
                    key={type.id}
                    variant={selectedType === type.id ? "default" : "secondary"}
                    className="cursor-pointer transition-all hover:scale-105"
                    onClick={() => handleTypeChange(type.id)}
                  >
                    {type.name} ({type.count})
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          Showing {Math.min(startIndex + 1, filteredRentals.length)} - {Math.min(startIndex + ITEMS_PER_PAGE, filteredRentals.length)} of {filteredRentals.length} rentals
        </p>
        {(searchTerm || selectedCategory !== 'all' || selectedType !== 'all') && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedType('all');
              setCurrentPage(1);
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Rental Grid */}
      <RentalGrid rentals={paginatedRentals} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Contact Information */}
      <Card className="mt-16 bg-primary-50 border-primary-200">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help with Your Rental?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Our plant rental specialists are here to help you choose the perfect plants and trees for your event or space. 
            Contact us for custom quotes, delivery arrangements, and professional setup services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Consultation
            </Button>
            <Button variant="outline" size="lg">
              Get Custom Quote
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 