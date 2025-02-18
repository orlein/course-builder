'use client';

import { NAV_ITEMS } from '@/lib/nav-items';
import { cn } from '@/lib/utils';
import {
  MapPinIcon,
  MemoryStickIcon,
  SearchIcon,
  StarIcon,
  UserIcon,
  WaypointsIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';

export default function BottomNav() {
  const segments = useSelectedLayoutSegments();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t max-w-screen-md mx-auto shadow-2xl border">
      <div className="container flex justify-around items-center h-16">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring focus-visible:ring-offset-background',
              {
                'text-primary': item.href === '/' + segments.slice(0).join('/'),
              },
            )}
          >
            {item.iconName === 'favorite' && <StarIcon />}
            {item.iconName === 'map' && <MapPinIcon />}
            {item.iconName === 'course' && <WaypointsIcon />}
            {item.iconName === 'memo' && <MemoryStickIcon />}
            {item.iconName === 'pin' && <SearchIcon />}
            {item.iconName === 'profile' && <UserIcon />}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
