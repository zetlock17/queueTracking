import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppBody from './components/AppBody/AppBody';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './components/AuthContext';
import styles from './App.module.css';
import Account from './components/Account/Account';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className={styles.app}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<ProtectedRoute element={<Account />} />} />
            <Route path="/" element={<ProtectedRoute element={<AppBody />} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;