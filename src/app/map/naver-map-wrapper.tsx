'use client';
import {
  NaverCoordinateDisplay,
  NaverMap,
  NaverMapAddress,
  NaverMapAuthorizer,
  NaverMapContent,
  NaverMapInitializer,
  NaverSearchPlace,
} from '@/components/naver-map';
import React from 'react';

export function NaverMapWrapper() {
  return (
    <NaverMap mapId="naver-map-1">
      <NaverMapContent />
      <NaverMapInitializer>현재 위치로 이동</NaverMapInitializer>
      <NaverMapAuthorizer>위치 권한 요청</NaverMapAuthorizer>
      <NaverCoordinateDisplay />
      <NaverMapAddress />
      <NaverSearchPlace />
    </NaverMap>
  );
}
