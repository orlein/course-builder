import { Button } from '@/components/ui/button';

interface Restaurant {
  id: string;
  name: string;
  rating: number;
  description: string;
}

// Mock data for demonstration
const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Yucky Burgers',
    rating: 1.5,
    description: 'The burgers are always undercooked and the fries are soggy.',
  },
  {
    id: '2',
    name: 'Stale Sushi',
    rating: 2,
    description: "The fish doesn't smell fresh and the rice is always dry.",
  },
  {
    id: '3',
    name: 'Burnt Toast Cafe',
    rating: 1,
    description: 'They somehow manage to burn everything, even the salads!',
  },
];

export default function MapPage() {
  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">Bad Restaurants Map</h2>
      <div className="bg-muted h-64 flex items-center justify-center rounded-lg mb-4">
        <p className="text-muted-foreground">
          Map component will be implemented here.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {mockRestaurants.map((restaurant) => (
          <Button key={restaurant.id} variant="outline">
            {restaurant.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
