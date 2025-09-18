import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ContactPage from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirige la racine vers /contact pour l’instant */}
        <Route path="/" element={<Navigate to="/contact" replace />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
