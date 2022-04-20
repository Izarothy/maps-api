import * as React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Destination, Source } from 'types/types';
import TrackCostForm from './TrackCostForm';

type MapProps = {
  source: Source;
  destination: Destination;
};

function Map({ source, destination }: MapProps) {
  return (
    <div className="h-screen">
      {destination?.coordinates.length > 1 && (
        <MapContainer
          className="h-full w-full"
          center={destination.coordinates}
          zoom={12}
          scrollWheelZoom
        >
          {/* @ts-ignore */}
          <Marker position={source.coordinates}>
            <Popup>Source</Popup>
          </Marker>
          {/* @ts-ignore */}
          <Marker position={destination.coordinates}>
            <Popup>Destination</Popup>
          </Marker>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <TrackCostForm source={source} destination={destination} />
        </MapContainer>
      )}
    </div>
  );
}

export default Map;
