'use client';

import { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import { plants, categories } from '@/data/plants';
import PlantGrid from '@/components/plants/PlantGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function PlantsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter plants based on category
  const filteredPlants = useMemo(() => {
    return plants.filter(plant => {
      const matchesCategory = selectedCategory === 'all' || plant.category === selectedCategory;
      return matchesCategory;
    });
  }, [selectedCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPlants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPlants = filteredPlants.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when filters change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Plant Collection</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore our beautiful selection of carefully curated plants, perfect  space and lifestyle.
        </p>
      </div>

      {/* Category Filters */}
      <Card className="mb-8 shadow-lg border-0 bg-white/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <p className="text-center text-sm font-medium text-muted-foreground mb-3">Filter by Category</p>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
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
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="mb-6 text-center">
        <p className="text-gray-600">
          Showing {paginatedPlants.length} of {filteredPlants.length} plants
          {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
        </p>
      </div>

      {/* Plant Grid */}
      <PlantGrid plants={paginatedPlants} className="mb-12" />

      {/* Pagination */}
      {totalPages > 1 && (
        <Card className="border-0 shadow-md bg-white/30 backdrop-blur-sm">
          <CardContent className="py-4">
            <div className="flex justify-center items-center space-x-2">
              <Button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                variant="outline"
                size="sm"
              >
                Previous
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  className="min-w-[40px]"
                >
                  {page}
                </Button>
              ))}
              
              <Button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                variant="outline"
                size="sm"
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 