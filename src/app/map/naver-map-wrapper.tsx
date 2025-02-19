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
  const markerRef = React.useRef<null | naver.maps.Marker>(null);

  return (
    <NaverMap mapId="naver-map-1">
      <NaverMapContent
        onClickMap={(event, map) => {
          markerRef.current?.setMap(null);
          const marker = new naver.maps.Marker({
            position: event.coord,
            map: map,
          });
          markerRef.current = marker;
        }}
      />
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
