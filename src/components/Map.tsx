import * as React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import TrackCostForm from './TrackCostForm';

type MapProps = {
  sourceCoordinates: number[];
  destCoordinates: number[];
};

function Map({ sourceCoordinates, destCoordinates }: MapProps) {
  return (
    destCoordinates.length > 1 && (
      <MapContainer
        className="relative"
        center={destCoordinates}
        zoom={12}
        scrollWheelZoom={false}
      >
        <Marker position={sourceCoordinates}>
          <Popup>Source</Popup>
        </Marker>
        <Marker position={destCoordinates}>
          <Popup>Destination</Popup>
        </Marker>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <TrackCostForm />
      </MapContainer>
    )
  );
}

export default Map;
