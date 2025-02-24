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
import { AddPinButton } from './add-pin-form';
import { FormMessage } from '@/components/form-message';

export function NaverMapWrapper() {
  const markerRef = React.useRef<null | naver.maps.Marker>(null);
  const contextRef = React.useRef<null | HTMLDivElement>(null);

  return (
    <NaverMap mapId="naver-map-1">
      <NaverMapContent
        onClickMap={(event, map) => {
          contextRef.current?.click();
          markerRef.current?.setMap(null);
          const marker = new naver.maps.Marker({
            position: event.coord,
            map: map,
          });
          marker.addListener('click', (e) => {
            console.log('marker clicked', e);
          });
          marker.addListener('rightclick', (e) => {
            console.log('marker right clicked', e);
          });
          markerRef.current = marker;
        }}
      />
      <NaverZoomControl />
      <NaverMapInitializer>현재 위치로 이동</NaverMapInitializer>
      <NaverMapAuthorizer>위치 권한 요청</NaverMapAuthorizer>
      <AddPinButton />
      {/* <p>네이버 좌표</p>
      <NaverCoordinateDisplay />
      <p>네이버 주소</p>
      <NaverMapAddress />
      <p>네이버 장소 검색</p>
      <NaverSearchPlace /> */}
    </NaverMap>
  );
}
