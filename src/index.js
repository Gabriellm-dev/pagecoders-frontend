import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'; // Certifique-se de que este arquivo existe e contém os estilos necessários
import App from './App'; // Certifique-se de que o componente App está corretamente exportado

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
