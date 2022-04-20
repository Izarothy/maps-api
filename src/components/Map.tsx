import * as React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import TrackCostForm from './TrackCostForm';

type MapProps = {
  destCoordinates: number[];
};

function Map({ destCoordinates }: MapProps) {
  return (
    destCoordinates.length > 1 && (
      <MapContainer
        className="relative"
        center={destCoordinates}
        zoom={12}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <TrackCostForm />
      </MapContainer>
    )
  );
}

export default Map;
