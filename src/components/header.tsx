'use client';

import { Button } from '@/components/ui/button';
import { NAV_ITEMS } from '@/lib/nav-items';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter, useSelectedLayoutSegments } from 'next/navigation';

export default function Header() {
  const segments = useSelectedLayoutSegments();
  const { back } = useRouter();

  const isBackButtonVisible = !NAV_ITEMS.some(
    (item) => item.href === '/' + segments.slice(0).join('/'),
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center gap-4">
        {isBackButtonVisible ? (
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => {
              back();
            }}
          >
            <ArrowLeftIcon className="h-6 w-6" />
            <span className="sr-only">뒤로가기</span>
          </Button>
        ) : (
          <Button size="icon" variant={'ghost'} className="mr-2" disabled>
            <div className="w-6 h-6" />
          </Button>
        )}
        <h1 className="text-lg font-semibold">코스빌더</h1>
      </div>
    </header>
  );
}
