import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider2 from './Context/AuthProvider2.jsx';

const isDarkMode = localStorage.getItem('admin-theme') === 'dark';
document.documentElement.classList.toggle('dark', isDarkMode);
document.body.classList.toggle('dark', isDarkMode);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider2>
    <div>
      <App />
    </div>
  </AuthProvider2>
);


