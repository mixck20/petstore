import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import PetAdd from './PetAdd';
import EditPet from './EditPet';

console.log(PetAdd);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add" element={<PetAdd />} />
        <Route path="/edit/:id" element={<EditPet />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
