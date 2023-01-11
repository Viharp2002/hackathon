import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider from './context/auth';
import AdminProvider from './context/admin';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <AdminProvider>
            <App />
        </AdminProvider>
    </AuthProvider>
);

