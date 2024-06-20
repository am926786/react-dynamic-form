import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import Level1Form from './Level1Form';
import Level2Form from './Level2Form';
import Level3Form from './Level3Form';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/level1" element={<Level1Form />} />
        <Route path="/level2" element={<Level2Form />} />
        <Route path="/level3" element={<Level3Form />} />
      </Routes>
    </Router>
  );
};

export default App;
