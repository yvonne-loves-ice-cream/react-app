import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CampaignList from './CampaignList';
import Dashboard from './Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';




function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<CampaignList />} />
      <Route path="/dashboard/:cid" element={<Dashboard />} />
    </Routes>
  </Router>
  );
}

export default App;
