import { Tour } from '../app/types/tour'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, GraduationCap, Star } from 'lucide-react'

type ResultsSectionProps = {
  tours: Tour[]
  isLoading: boolean
  showByCollection: boolean
}

export default function ResultsSection({ tours, isLoading, showByCollection }: ResultsSectionProps) {
  const groupedTours = showByCollection
  ? tours.reduce((acc, tour) => {
      if (tour.collection) { 
        if (!acc[tour.collection]) {
          acc[tour.collection] = []
        }
        acc[tour.collection].push(tour)
      }
      return acc
    }, {} as Record<string, Tour[]>)
  : { 'All Tours': tours }

  return (
    <section
      id="tours-section" // Add the id here
      className="py-12 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">No tours match your filters</h2>
            <p className="text-gray-600">
              Try adjusting your selections or exploring a different collection.
            </p>
          </div>
        ) : (
          Object.entries(groupedTours).map(([collection, collectionTours]) => (
            <div key={collection} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{collection}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collectionTours.map((tour) => (
                  <Card key={tour.id} className="overflow-hidden transition-transform hover:scale-105 relative">
                    {tour.travelForCredit && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                        <GraduationCap className="w-4 h-4 mr-1" />
                        Travel for Credit
                      </div>
                    )}
                    {tour.aPlusCollection && (
                      <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        A+ Collection
                      </div>
                    )}
                    <img src={tour.image} alt={tour.name} className="w-full h-48 object-cover" />
                    <CardHeader>
                      <CardTitle>{tour.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-sm text-gray-600">{tour.description}</p>
                      <p className="text-lg font-semibold">
                        {tour.duration} - Starting at ${tour.price}
                      </p>
                      <p className="text-sm text-gray-600">
                        {tour.destination} | {tour.collection}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}