'use client';
import {
  NaverCoordinateDisplay,
  NaverMap,
  NaverMapAddress,
  NaverMapAuthorizer,
  NaverMapContent,
  NaverMapInitializer,
  NaverSearchPlace,
  NaverZoomControl,
} from '@/components/naver-map';
import React from 'react';

export function NaverMapWrapper() {
  return (
    <NaverMap mapId="naver-map-1">
      <NaverMapContent />
      <NaverZoomControl />
      <NaverMapInitializer>현재 위치로 이동</NaverMapInitializer>
      <NaverMapAuthorizer>위치 권한 요청</NaverMapAuthorizer>
      <p>네이버 좌표</p>
      <NaverCoordinateDisplay />
      <p>네이버 주소</p>
      <NaverMapAddress />
      <p>네이버 장소 검색</p>
      <NaverSearchPlace />
    </NaverMap>
  );
}
