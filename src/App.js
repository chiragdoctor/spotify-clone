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
    dispatch({
      type: 'SET_SPOTIFY',
      spotify,
    });

    const hash = getTokenFromUrl();
    // Clearning the url which has access_token after redirection.
    if (hash.access_token) {
      let _token = hash.access_token;
      console.log('_token :>> ', _token);
      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      });
      localStorage.setItem('token', _token);
      window.location.hash = '';
    } else {
      console.log('token :>> ', token);
      spotify.setAccessToken(token);
      spotify.getMe().then((user) => {
        dispatch({
          type: 'SET_USER',
          user,
        });
      });

      // get user playlist
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists,
        });
      });

      spotify.getPlaylist('37i9dQZEVXcCR1sa3f3P5V').then((discover_weekly) => {
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log('token :>> ', token);
  return <div className='app'>{token ? <Player /> : <Login />}</div>;
}

export default App;
