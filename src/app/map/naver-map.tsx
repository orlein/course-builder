'use client';
import { Coordinates, NaverMap } from '@/app/types/map';
import Script from 'next/script';
import React from 'react';

const mapId = 'naver-map';

export const searchCoordinateToAddress = (
  coords: naver.maps.LatLng,
  map: naver.maps.Map,
  addressCallback: (address: string) => void,
) => {
  naver.maps.Service.reverseGeocode(
    // options
    {
      coords: coords,
      orders: [
        naver.maps.Service.OrderType.ADDR,
        naver.maps.Service.OrderType.ROAD_ADDR,
      ].join(','),
    },
    // callback
    function (
      status: naver.maps.Service.Status,
      response: naver.maps.Service.ReverseGeocodeResponse,
    ) {
      // 응답을 못 받으면 'Something went wrong' alert 띄우기
      if (status !== naver.maps.Service.Status.OK) {
        return alert('Something went wrong!');
      }

      // 도로명 주소가 있다면 도로명 주소를, 없다면 지번 주소를 address 변수에 담는다.
      const address = response.v2.address.roadAddress
        ? response.v2.address.roadAddress
        : response.v2.address.jibunAddress;

      addressCallback(address);
    },
  );
};

export default function Map({
  loc,
  addressCallback,
}: {
  loc: Coordinates;
  addressCallback: (address: string) => void;
}) {
  const mapRef = React.useRef<NaverMap>(null);

  const initializeMap = React.useCallback(() => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(loc),
      zoom: 15,
      scaleControl: true,
      mapDataControl: true,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
      draggable: true,
      disableDoubleClickZoom: true,
      disableDoubleTapZoom: true,
    } satisfies naver.maps.MapOptions;
    const map = new window.naver.maps.Map(mapId, mapOptions);
    naver.maps.Event.addListener(map, 'click', function (e) {
      searchCoordinateToAddress(e.coord, map, addressCallback);
    });
    mapRef.current = map;
  }, [loc, addressCallback]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`}
        onReady={initializeMap}
      />
      <div id={mapId} style={{ width: '100%', height: 400 }} />
    </>
  );
}
