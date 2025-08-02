'use client';

import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { orchids, orchidCategories } from '@/data/orchids';
import OrchidGrid from '@/components/orchids/OrchidGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function OrchidsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter orchids based on search and category
  const filteredOrchids = useMemo(() => {
    return orchids.filter(orchid => {
      const matchesSearch = orchid.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          orchid.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || orchid.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrchids.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrchids = filteredOrchids.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when filters change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Premium Orchid Collection</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our exquisite selection of {orchids.length} premium orchids, from classic phalaenopsis to rare and exotic varieties.
        </p>
      </div>

      {/* Category Filters */}
      <Card className="mb-6 shadow-lg border-0 bg-white/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <p className="text-center text-sm font-medium text-muted-foreground mb-3">Filter by Category</p>
          <div className="flex flex-wrap justify-center gap-2">
            {orchidCategories.map((category) => (
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
          Showing {paginatedOrchids.length} of {filteredOrchids.length} orchids
          {selectedCategory !== 'all' && ` in ${orchidCategories.find(c => c.id === selectedCategory)?.name}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {/* Orchid Grid */}
      <OrchidGrid orchids={paginatedOrchids} className="mb-12" />

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