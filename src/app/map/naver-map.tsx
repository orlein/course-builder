'use client';

import { Map, Marker, useNaverMapInit } from '@r2don/react-naver-map';

const MARKERS = [
  { latitude: 37, longitude: 127 },
  { latitude: 37.5, longitude: 127.5 },
  { latitude: 38, longitude: 128 },
  { latitude: 38.5, longitude: 128.5 },
];

export function NaverMap() {
  return <p>Hello</p>;
  // const { isError, isLoaded } = useNaverMapInit({
  //   ncpClientId: process.env.NEXT_NAVER_MAP_CLIENT_ID!,
  // });

  // if (!isLoaded) {
  //   return (
  //     <div className="bg-muted h-64 flex items-center justify-center rounded-lg mb-4">
  //       <p className="text-muted-foreground">네이버 맵이 로딩중입니다</p>
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <div className="bg-muted h-64 flex items-center justify-center rounded-lg mb-4">
  //       <p className="text-muted-foreground">
  //         네이버 맵을 로딩하는 도중 에러가 발생했습니다
  //       </p>
  //     </div>
  //   );
  // }

  // return (
  //   <>
  //     <Map
  //       center={{ latitude: 37.3595704, longitude: 127.105399 }}
  //       style={{ height: '500px', width: '500px' }}
  //     >
  //       <>
  //         {MARKERS.map((marker) => (
  //           <Marker key={JSON.stringify(marker)} position={marker} />
  //         ))}
  //       </>
  //     </Map>
  //   </>
  // );
}
