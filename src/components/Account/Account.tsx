import React from 'react';
import { useAuth } from './../AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Account.module.css';

const Account: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate('/');
  };

  const handleGoToMain = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <h2>Профиль</h2>
      {auth.userName && <p>Имя пользователя: {auth.userName}</p>}
      <div className={styles.buttonContainer}>
        <button onClick={handleGoToMain} className={styles.button}>Перейти на главную</button>
        <button onClick={handleLogout} className={styles.button}>Выйти</button>
      </div>
    </div>
  );
};

export default Account;