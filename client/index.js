import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import styles from './styles/main.scss';

createRoot(document.getElementById('app')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
