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
      <h1 className="text-3xl font-bold">코스빌더에 오신것을 환영합니다.</h1>
      <p className="text-muted-foreground">여행 코스를 같이 만들어봐요.</p>

      <Card>
        <CardHeader>
          <CardTitle>코스 검색</CardTitle>
          <CardDescription>원하는 여행 코스를 검색해보세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <SearchIcon size={48} />
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/search">코스 검색</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
