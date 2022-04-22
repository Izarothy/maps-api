import { LatLngExpression } from 'leaflet';
import * as React from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { Destination, Source } from 'types/types';
import TrackCostForm from './TrackCostForm';

type MapProps = {
  source: Source;
  destination: Destination;
  distanceInKm: number;
};

function Map({ source, destination, distanceInKm }: MapProps) {
  return (
    <div className="h-screen">
      {destination?.coordinates.length > 1 ? (
        <>
          <MapContainer className="h-full w-full" center={destination.coordinates} zoom={12} scrollWheelZoom>
            <Marker position={source.coordinates as LatLngExpression}>
              <Popup>Source</Popup>
            </Marker>
            <Marker position={destination.coordinates as LatLngExpression}>
              <Popup>Destination</Popup>
            </Marker>
            <Polyline positions={[source.coordinates as LatLngExpression, destination.coordinates as LatLngExpression]} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
          <TrackCostForm source={source} destination={destination} distanceInKm={distanceInKm} />
        </>
      ) : (
        <main className="h-full text-center flex flex-col justify-center items-center">
          <h1 className="text-3xl font-semibold">
            Nothing found here.{' '}
            <span className="text-md text-blue-500">
              <Link to="/">Go back to main</Link>
            </span>
          </h1>
        </main>
      )}
    </div>
  );
}

export default Map;
