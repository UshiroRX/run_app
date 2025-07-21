import { MapContainer, TileLayer, Marker } from "react-leaflet";

export default function MiniMap({ lat, lng }: { lat: number; lng: number }) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      style={{ height: 100, width: 150, borderRadius: 8 }}
      dragging={false}
      doubleClickZoom={false}
      scrollWheelZoom={false}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[lat, lng]} />
    </MapContainer>
  );
}
