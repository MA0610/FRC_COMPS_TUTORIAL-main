import React, { useState } from 'react';
import { Code } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { login } = useAuth();

  const handleSubmit = () => {
    if (email && password) {
      login(email, password);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <div className={styles.loginIcon}>
            <Code size={40} />
          </div>
          <h1 className={styles.loginTitle}>CodeLearn Tutorials</h1>
          <p className={styles.loginSubtitle}>Interactive coding tutorials</p>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles.formInput}
              placeholder="Enter your email"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles.formInput}
              placeholder="Enter your password"
            />
          </div>

          <button
            onClick={handleSubmit}
            className={styles.submitButton}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </div>

        <div className={styles.toggleAuth}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className={styles.toggleLink}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;