import Form from 'components/Form';
import * as React from 'react';
import { useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Map from './components/Map';

function App() {
  const [destCoordinates, setDestCoordinates] = useState<number[] | never[]>(
    [],
  );

  return (
    <Router>
      <div className="min-h-screen grid place-items-center ">
        <Routes>
          <Route
            path="/map"
            element={<Map destCoordinates={destCoordinates} />}
          />
          <Route
            path="/"
            element={
              <Form
                destCoordinates={destCoordinates}
                setDestCoordinates={setDestCoordinates}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
