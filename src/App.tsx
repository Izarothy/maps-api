import Form from 'components/Form';
import * as React from 'react';
import { useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Map from './components/Map';

function App() {
  const [destination, setDestination] = useState();
  const [source, setSource] = useState();

  return (
    <Router>
      <Routes>
        <Route
          path="/map"
          element={<Map destination={destination} source={source} />}
        />
        <Route
          path="/"
          element={
            <Form
              destination={destination}
              setDestination={setDestination}
              source={source}
              setSource={setSource}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
