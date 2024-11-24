'use client';

import { useState } from 'react';
import HeroSection from './hero-section';
import FilterSection from './filter-section';
import ResultsSection from './results-section';

export type Filter = {
  destination: string;
  collection: string;
  duration: string;
  priceRange: [number, number];
  showByCollection: boolean;
  searchKeyword: string;
  travelForCredit: boolean;
  aPlusCollection: boolean;
};

const initialFilter: Filter = {
  destination: '',
  collection: '',
  duration: '',
  priceRange: [0, 10000],
  showByCollection: false,
  searchKeyword: '',
  travelForCredit: false,
  aPlusCollection: false,
};

export default function TourFinder() {
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (newFilter: Partial<Filter>) => {
    setIsLoading(true);
    setFilter((prev) => ({ ...prev, ...newFilter }));
    // Simulate API call or delay
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleResetFilters = () => {
    setFilter(initialFilter);
  };

  const tourCount = 15; // This would typically come from an API call

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        tourCount={tourCount}
        searchKeyword={filter.searchKeyword}
        onSearchChange={(keyword) => handleFilterChange({ searchKeyword: keyword })}
      />
      <FilterSection filter={filter} onFilterChange={handleFilterChange} onResetFilters={handleResetFilters} />
      <ResultsSection tours={[]} isLoading={isLoading} showByCollection={filter.showByCollection} />
    </div>
  );
}
