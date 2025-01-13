import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { StarIcon, MapPinIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container p-6 space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Bad Bobjibs</h1>
      <p className="text-muted-foreground">
        Discover and share the worst dining experiences in town!
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Worst of the Week</CardTitle>
            <CardDescription>You won't believe this one!</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold">Moldy Muffin Café</h3>
            <p className="text-sm text-muted-foreground">
              Where every bite is a surprise (and not in a good way).
            </p>
            <div className="flex items-center mt-2">
              <StarIcon className="w-4 h-4 fill-primary text-primary" />
              <span className="ml-1 text-sm">0.5/5</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/map">View on Map</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Bad Reviews</CardTitle>
            <CardDescription>Fresh disappointments</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>"I've had better meals in prison." - Soggy Burger Joint</li>
              <li>
                "The waiter sneezed on my food and called it 'extra seasoning'."
                - Grimy Grill
              </li>
              <li>
                "I'm pretty sure the 'chicken' was actually rubber." - Fowl Play
                Diner
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/search">Find More</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bad Bobjib of the Month</CardTitle>
            <CardDescription>A true masterpiece of awfulness</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold">The Burnt Bistro</h3>
            <p className="text-sm text-muted-foreground">
              Where "well-done" means "incinerated".
            </p>
            <div className="flex items-center mt-2">
              <StarIcon className="w-4 h-4 fill-primary text-primary" />
              <span className="ml-1 text-sm">0.2/5</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/map">View on Map</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Button asChild size="lg">
          <Link href="/map">
            <MapPinIcon className="mr-2 h-4 w-4" /> Explore Bad Restaurants
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/search">
            <SearchIcon className="mr-2 h-4 w-4" /> Search for the Worst
          </Link>
        </Button>
      </div>
    </div>
  );
}
