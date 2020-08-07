/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';

function App() {
  const [token, setToken] = useState(null);

  // run code based on given condition
  useEffect(() => {
    const hash = getTokenFromUrl();
    const _token = hash.access_token;
    if (_token) {
      setToken(_token);
    }
  }, []);

  return (
    <div className='app'>{token ? <h1>I am logged In</h1> : <Login />}</div>
  );
}

export default App;
