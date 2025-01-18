'use client';

import { Coordinates } from '@/app/types/map';
import { Button } from '@/components/ui/button';
import React from 'react';
import Map from './naver-map';

export default function MapContainer() {
  const [loc, setLoc] = React.useState<Coordinates>();
  const [address, setAddress] = React.useState<string>('');

  const initLocation = React.useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLoc([position.coords.longitude, position.coords.latitude]);
    });
  }, []);

  React.useEffect(() => {
    initLocation();
  }, []);

  if (loc) {
    return (
      <>
        <Map
          loc={loc}
          addressCallback={(address) => {
            console.log('callback', address);
            setAddress(address);
          }}
        />
        <pre>{address}</pre>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Map
        loc={[126.9783882, 37.5666103]}
        addressCallback={(address) => {
          console.log('callback', address);
          setAddress(address);
        }}
      />
      <p>위치 정보를 가져오지 못했습니다. 권한이 있는지 확인해주세요.</p>
      <Button onClick={initLocation}>위치 다시 가져오기</Button>
      <pre>{address}</pre>
    </div>
  );
}
