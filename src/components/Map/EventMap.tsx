import "./EventMap.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { FC, useEffect } from "react";
import { LatLngExpression } from "leaflet";
import { useEventContext } from "../../Contexts/CreateEventContext";

const EventMap: FC = () => {
  const { eventInfo } = useEventContext();
  useEffect(() => {
    console.log("Hello:", eventInfo.venueLocation);
  }, [eventInfo.venueLocation]);

  const marker: { geocode: LatLngExpression } = {
    geocode: [28.0229, 73.3119],
  };

  return (
    <MapContainer center={marker.geocode} zoom={12}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={marker.geocode} />
    </MapContainer>
  );
};

export default EventMap;
