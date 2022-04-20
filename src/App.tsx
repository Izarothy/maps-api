import Form from 'components/Form';
import * as React from 'react';
import { useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Map from './components/Map';

function App() {
  const [destination, setDestination] = useState();
  const [source, setSource] = useState();
  const [distanceInKm, setDistanceInKm] = useState();
  return (
    <Router>
      <Routes>
        <Route
          path="/map"
          element={
            <Map
              destination={destination}
              source={source}
              distanceInKm={distanceInKm}
            />
          }
        />
        <Route
          path="/"
          element={
            <Form
              destination={destination}
              setDestination={setDestination}
              source={source}
              setSource={setSource}
              setDistanceInKm={setDistanceInKm}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
