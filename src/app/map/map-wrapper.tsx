'use client';
import dynamic from 'next/dynamic';

const NaverMap = dynamic(() =>
  import('./naver-map').then((mod) => mod.NaverMap),
);

export function MapWrapper() {
  return <NaverMap />;
}
