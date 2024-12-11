import React, { useState } from 'react';
import { useAuth } from './../AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      setError('Заполните все поля');
      return;
    }
    auth.login(username);
    navigate('/');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className={styles.form} onKeyPress={handleKeyPress}>
      <h2 className={styles.h2}>Авторизация</h2>
      {error && <p className={styles.error}>{error}</p>}
      <input
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleLogin} className={styles.button}>Войти</button>
    </div>
  );
};

export default Login;