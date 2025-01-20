import {
  NaverCoordinateDisplay,
  NaverMap,
  NaverMapAuthorizer,
  NaverMapContent,
  NaverMapInitializer,
} from '@/components/naver-map';

export default async function MapPage() {
  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">지도에서 관광지를 찾아보세요</h2>
      <NaverMap>
        <NaverMapContent />
        <NaverMapInitializer>현재 위치로 이동</NaverMapInitializer>
        <NaverMapAuthorizer>위치 권한 요청</NaverMapAuthorizer>
        <NaverCoordinateDisplay />
      </NaverMap>
    </div>
  );
}
