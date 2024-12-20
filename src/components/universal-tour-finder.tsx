'use client';

import { useState, useEffect } from 'react';
import HeroSection from './hero-section';
import FilterSection from './filter-section';
import ResultsSection from './results-section';
import { Tour } from '../app/types/tour';
import toursData from '../app/toursData.json';

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

export default function UniversalTourFinder() {
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [isLoading, setIsLoading] = useState(false);
  const [tours, setTours] = useState<Tour[]>([]);
  const [collections, setCollections] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);
  const [durations, setDurations] = useState<string[]>([]);

  // Extract filter options once on component mount
  useEffect(() => {
    // Set destinations and durations to fixed values
    setDestinations(['Africa', 'Asia & Oceania', 'Europe', 'Latin America', 'North America']);
    setDurations(['4-6 days', '7-9 days', '10-12 days', '13-15 days']);

    // Extract unique collections from data, excluding null or empty values
    const uniqueCollections = Array.from(
      new Set(toursData.map((tour) => tour.Collection).filter(Boolean))
    );
    setCollections(uniqueCollections);
  }, []);

  useEffect(() => {
    fetchTours();
  }, [filter]);

  const fetchTours = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay

    // Format the tours data
    const formattedTours: Tour[] = toursData.map((tour, index) => ({
      id: index + 1, // Assign a unique ID
      name: tour.Title,
      image: tour.ImageUrl,
      description: tour.Description,
      duration: tour.Duration,
      destination: tour.Destination || 'Unknown Destination',
      collection: tour.Collection || null,
      price: tour.price,
      link: tour.Link,
      travelForCredit: tour['Travel for Credit'] === 'Yes',
      aPlusCollection: tour['A+ Collection'] === 'Yes',
      popularity: tour.popularity || 0, // Ensure a default popularity value
    }));

    // Filter tours
    const filteredTours = formattedTours.filter((tour) =>
      (filter.destination === '' || tour.destination === filter.destination) &&
      (filter.collection === '' || tour.collection === filter.collection) &&
      (filter.duration === '' || tour.duration.includes(filter.duration)) &&
      (!filter.travelForCredit || tour.travelForCredit) &&
      (!filter.aPlusCollection || tour.aPlusCollection) &&
      (tour.price >= filter.priceRange[0] && tour.price <= filter.priceRange[1]) &&
      (filter.searchKeyword === '' ||
        tour.name.toLowerCase().includes(filter.searchKeyword.toLowerCase()) ||
        tour.destination.toLowerCase().includes(filter.searchKeyword.toLowerCase()) ||
        (tour.collection && tour.collection.toLowerCase().includes(filter.searchKeyword.toLowerCase())))
    );

    // Sort filtered tours by popularity
    const sortedTours = filteredTours.sort((a, b) => b.popularity - a.popularity);

    setTours(sortedTours);
    setIsLoading(false);
  };

  const handleFilterChange = (newFilter: Partial<Filter>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  const handleResetFilters = () => {
    setFilter(initialFilter);
  };

  const handleTourClick = (tourId: number) => {
    // Increment popularity for the clicked tour
    const updatedTours = tours.map((tour) =>
      tour.id === tourId ? { ...tour, popularity: tour.popularity + 1 } : tour
    );

    // Sort tours by popularity after the click
    const sortedTours = updatedTours.sort((a, b) => b.popularity - a.popularity);
    setTours(sortedTours);

    // Redirect to the tour's link
    const clickedTour = tours.find((tour) => tour.id === tourId);
    if (clickedTour) {
      window.location.href = clickedTour.link;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        tourCount={tours.length}
        searchKeyword={filter.searchKeyword}
        onSearchChange={(keyword) => handleFilterChange({ searchKeyword: keyword })}
      />
      <FilterSection
        filter={filter}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        collections={collections}
        destinations={destinations}
        durations={durations}
      />
      <ResultsSection
        tours={tours}
        isLoading={isLoading}
        showByCollection={filter.showByCollection}
        onTourClick={handleTourClick}
      />
    </div>
  );
}
