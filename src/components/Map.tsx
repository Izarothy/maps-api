import * as React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import TrackCostForm from './TrackCostForm';

type MapProps = {
  sourceCoordinates: number[];
  destCoordinates: number[];
};

function Map({ sourceCoordinates, destCoordinates }: MapProps) {
  return (
    <div className="h-screen">
      {destCoordinates.length > 1 && (
        <MapContainer
          className="h-full w-full"
          center={destCoordinates}
          zoom={12}
          scrollWheelZoom
        >
          {/* @ts-ignore */}
          <Marker position={sourceCoordinates}>
            <Popup>Source</Popup>
          </Marker>
          {/* @ts-ignore */}
          <Marker position={destCoordinates}>
            <Popup>Destination</Popup>
          </Marker>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <TrackCostForm />
        </MapContainer>
      )}
    </div>
  );
}

export default Map;
