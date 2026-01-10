import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider2 from './Context/AuthProvider2.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider2>
    <div>
      <App />
    </div>
  </AuthProvider2>
);



