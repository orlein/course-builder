'use client';
import {
  NaverMap,
  NaverMapAuthorizer,
  NaverMapContent,
  NaverMapInitializer,
  NaverZoomControl,
} from '@/components/naver-map';
import { Pin } from '@/db/schema';
import React from 'react';
import { AddPinButton } from './add-pin-form';

export function NaverMapWrapper(
  props: React.PropsWithChildren<{
    pins: Pin[];
  }>,
) {
  const markerRef = React.useRef<null | naver.maps.Marker>(null);

  return (
    <NaverMap mapId="naver-map-1">
      <NaverMapContent
        defaultPins={props.pins}
        onClickMap={(event, map) => {
          markerRef.current?.setMap(null);
          const marker = new naver.maps.Marker({
            position: event.coord,
            map: map,
            animation: naver.maps.Animation.BOUNCE,
            title: '클릭한 위치',
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
