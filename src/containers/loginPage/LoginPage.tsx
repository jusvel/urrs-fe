import './LoginPage.css';
import { login } from '../../api/loginApi.ts';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onLoginClicked = async () => {
    try {
      setError('');
      const errorMessage = await login(email, password);

      if (errorMessage) {
        setError(errorMessage);
      } else {
        navigate('/');
      }
    } catch (err: unknown) {
      setError(`An unexpected error occurred. ${err}`);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="input-container">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button className="login-button" onClick={onLoginClicked}>
        Login
      </button>
    </div>
  );
};
