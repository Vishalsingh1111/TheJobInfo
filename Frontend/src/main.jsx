import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './Context/AuthProvider.jsx';
import AuthProvider2 from './Context/AuthProvider2.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <AuthProvider2>
        <div className='dark:bg-slate-900 dark:text-white bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900'>
          <App />
        </div>
      </AuthProvider2>
    </AuthProvider>
  </BrowserRouter>
);
