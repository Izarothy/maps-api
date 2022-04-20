import * as React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

type MapProps = {
  destCoordinates: number[];
};

function Map({ destCoordinates }: MapProps) {
  return (
    destCoordinates.length > 1 && (
      <MapContainer center={destCoordinates} zoom={15} scrollWheelZoom>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    )
  );
}

export default Map;
