'use client';
import {
  NaverCoordinateDisplay,
  NaverMap,
  NaverMapAuthorizer,
  NaverMapContent,
  NaverMapInitializer,
} from '@/components/naver-map';

export function NaverMapWrapper() {
  return (
    <NaverMap>
      <NaverMapContent
        onClickMap={(e) => {
          console.log('clicked', e);
        }}
      />
      <NaverMapInitializer>현재 위치로 이동</NaverMapInitializer>
      <NaverMapAuthorizer>위치 권한 요청</NaverMapAuthorizer>
      <NaverCoordinateDisplay />
    </NaverMap>
  );
}
