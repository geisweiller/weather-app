import { LatLngExpression } from "leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import "leaflet/dist/leaflet.css";

interface MapProps {
  /**
   * Coordinates to center the map
   */
  coordinates: LatLngExpression;
}

export const Map = ({ coordinates }: MapProps) => {
  return (
    <MapContainer
      center={coordinates}
      zoom={10}
      scrollWheelZoom={false}
      dragging={false}
      zoomControl={false}
      className="w-full h-72 rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};
