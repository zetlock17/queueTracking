import React from 'react';
import AppBody from './components/AppBody/AppBody';
import AppHeader from './components/AppHeader/AppHeader';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.main}>
      <AppHeader/>
      <AppBody/>
    </div>
  );
}

export default App;
