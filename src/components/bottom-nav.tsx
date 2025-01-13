'use client';

import { NAV_ITEMS } from '@/lib/nav-items';
import { cn } from '@/lib/utils';
import { HomeIcon, MapPinIcon, SearchIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import React from 'react';

export default function BottomNav() {
  const segments = useSelectedLayoutSegments();
  const isActive = React.useMemo(() => {
    return NAV_ITEMS.some(
      (item) => item.href === '/' + segments.slice(0).join('/'),
    );
  }, []);

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
                'text-primary': isActive,
              },
            )}
          >
            {item.iconName === 'home' && <HomeIcon />}
            {item.iconName === 'map' && <MapPinIcon />}
            {item.iconName === 'pin' && <SearchIcon />}
            {item.iconName === 'user' && <UserIcon />}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
