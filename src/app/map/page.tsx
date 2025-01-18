import MapContainer from './map-container';

export default async function MapPage() {
  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">지도에서 관광지를 찾아보세요</h2>
      <MapContainer />
    </div>
  );
}
