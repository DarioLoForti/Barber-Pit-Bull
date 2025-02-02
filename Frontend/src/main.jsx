import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { AuthProvider } from "./contexts/AuthContext";
import { GlobalProvider } from "./contexts/GlobalContext";
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <GlobalProvider>
          <AuthProvider>
              <App />  
          </AuthProvider>
      </GlobalProvider>
  </BrowserRouter>
  
)
