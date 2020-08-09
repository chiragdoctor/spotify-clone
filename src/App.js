/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect } from 'react';
import SpotifyWebAPi from 'spotify-web-api-js';
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import Player from './Player';
import { useDataLayerValue } from './DataLayer';

const s = new SpotifyWebAPi();

function App() {
  const [{ token }, dispatch] = useDataLayerValue();
  // run code based on given condition
  useEffect(() => {
    // Set token
    const hash = getTokenFromUrl();
    // window.location.hash = '';
    let _token = hash.access_token;

    if (_token) {
      s.setAccessToken(_token);
      console.log('token :>> ', _token);
      new dispatch({
        type: 'SET_TOKEN',
        token: _token,
      });

      s.getPlaylist('37i9dQZEVXcCR1sa3f3P5V').then((response) =>
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: response,
        }),
      );

      s.getMyTopArtists().then((response) =>
        dispatch({
          type: 'SET_TOP_ARTISTS',
          top_artists: response,
        }),
      );

      dispatch({
        type: 'SET_SPOTIFY',
        spotify: s,
      });

      s.getMe().then((user) => {
        dispatch({
          type: 'SET_USER',
          user,
        });
      });

      s.getUserPlaylists().then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists,
        });
      });
    }
  }, [token, dispatch]);

  return <div className='app'>{token ? <Player /> : <Login />}</div>;
}

export default App;
