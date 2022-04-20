import Form from 'components/Form';
import * as React from 'react';
import { useState } from 'react';

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
    </Router>
  );
}

export default App;
