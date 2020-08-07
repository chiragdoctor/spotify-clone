/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect, useState } from 'react';
import SpotifyWebAPi from 'spotify-web-api-js';
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import Player from './Player';
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotifyWebAPi();

function App() {
  const [token, setToken] = useState(null);
  const [{ user }, dispatch] = useDataLayerValue();
  // run code based on given condition
  useEffect(() => {
    const hash = getTokenFromUrl();
    // Clearning the url which has access_token after redirection.
    window.location.hash = '';
    const _token = hash.access_token;
    if (_token) {
      setToken(_token);
      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        dispatch({
          type: 'SET_USER',
          user,
        });
      });
    }
  }, []);

  console.log('💁 :>> ', user);
  return <div className='app'>{token ? <Player /> : <Login />}</div>;
}

export default App;
