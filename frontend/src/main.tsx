import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './Routes.jsx';
import ReactDOM from 'react-dom/client';
import React from 'react';


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
)
