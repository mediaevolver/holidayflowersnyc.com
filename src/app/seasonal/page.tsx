'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Snowflake, Sun } from 'lucide-react';
import { seasonalItems, seasonalCategories, seasonalSeasons } from '@/data/seasonal';
import SeasonalGrid from '@/components/seasonal/SeasonalGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function SeasonalPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter seasonal items based on search, category, and season
  const filteredSeasonalItems = useMemo(() => {
    return seasonalItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSeason = selectedSeason === 'all' || item.season === selectedSeason;
      return matchesSearch && matchesCategory && matchesSeason;
    });
  }, [searchTerm, selectedCategory, selectedSeason]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredSeasonalItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSeasonalItems = filteredSeasonalItems.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when filters change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSeasonChange = (season: string) => {
    setSelectedSeason(season);
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Seasonal Collection</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our beautiful seasonal flower arrangements featuring {seasonalItems.length} stunning varieties perfect for celebrating every season.
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6 shadow-lg border-0 bg-white/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Season Filters */}
            <div className="space-y-3">
              <p className="text-center text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
                <Snowflake className="h-4 w-4" />
                Filter by Season
                <Sun className="h-4 w-4" />
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {seasonalSeasons.map((season) => (
                  <Badge
                    key={season.id}
                    variant={selectedSeason === season.id ? "default" : "secondary"}
                    className="cursor-pointer transition-all hover:scale-105"
                    onClick={() => handleSeasonChange(season.id)}
                  >
                    {season.name} ({season.count})
                  </Badge>
                ))}
              </div>
            </div>

            {/* Category Filters */}
            <div className="space-y-3">
              <p className="text-center text-sm font-medium text-muted-foreground">Filter by Flower Type</p>
              <div className="flex flex-wrap justify-center gap-2">
                {seasonalCategories.map((category) => (
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
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="mb-6 text-center">
        <p className="text-gray-600">
          Showing {paginatedSeasonalItems.length} of {filteredSeasonalItems.length} seasonal arrangements
          {selectedCategory !== 'all' && ` in ${seasonalCategories.find(c => c.id === selectedCategory)?.name}`}
          {selectedSeason !== 'all' && ` for ${seasonalSeasons.find(s => s.id === selectedSeason)?.name}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {/* Seasonal Grid */}
      <SeasonalGrid seasonalItems={paginatedSeasonalItems} className="mb-12" />

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