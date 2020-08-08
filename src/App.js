/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect } from 'react';
import SpotifyWebAPi from 'spotify-web-api-js';
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import Player from './Player';
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotifyWebAPi();

function App() {
  const [{ token }, dispatch] = useDataLayerValue();
  // run code based on given condition
  useEffect(() => {
    const hash = getTokenFromUrl();
    // Clearning the url which has access_token after redirection.
    window.location.hash = '';
    const _token = hash.access_token;
    if (_token) {
      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      });
      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        dispatch({
          type: 'SET_USER',
          user,
        });
      });
      console.log('heer :>> ');
      // get user playlist
      spotify.getUserPlaylists().then((playlists) => {
        console.log('🤽‍♂️', playlists);
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='app'>
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
