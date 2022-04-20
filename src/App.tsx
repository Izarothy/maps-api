import Form from 'components/Form';
import * as React from 'react';
import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Map from './components/Map';

function App() {
  const [destCoordinates, setDestCoordinates] = useState<number[]>(
    [] as number[],
  );
  const [sourceCoordinates, setSourceCoordinates] = useState<number[]>(
    [] as number[],
  );

  return (
    <Router>
      <div className="min-h-screen grid place-items-center ">
        <Routes>
          <Route
            path="/map"
            element={
              <Map
                destCoordinates={destCoordinates}
                sourceCoordinates={sourceCoordinates}
              />
            }
          />
          <Route
            path="/"
            element={
              <Form
                destCoordinates={destCoordinates}
                setDestCoordinates={setDestCoordinates}
                sourceCoordinates={sourceCoordinates}
                setSourceCoordinates={setSourceCoordinates}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
