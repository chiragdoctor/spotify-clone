import React, { useEffect } from 'react';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import { Grid, Slider, CircularProgress } from '@material-ui/core';
import './Footer.css';
import { useDataLayerValue } from './DataLayer';
const Footer = () => {
  const [{ spotify, playing, item }, dispatch] = useDataLayerValue();

  useEffect(() => {
    spotify &&
      spotify.getMyCurrentPlaybackState().then((r) => {
        dispatch({
          type: 'SET_PLAYING',
          playing: r.is_playing,
        });
        dispatch({
          type: 'SET_ITEM',
          item: r.item,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotify]);

  const skipNext = () => {
    spotify &&
      spotify.skipToNext().then(() => {
        spotify &&
          spotify.getMyCurrentPlaybackState().then((r) => {
            dispatch({
              type: 'SET_PLAYING',
              playing: r.is_playing,
            });
            dispatch({
              type: 'SET_ITEM',
              item: r.item,
            });
          });
      });
  };

  const skipPrevious = () => {
    spotify &&
      spotify.skipToPrevious().then(() => {
        spotify.getMyCurrentPlaybackState().then((r) => {
          dispatch({
            type: 'SET_PLAYING',
            playing: r.is_playing,
          });
          dispatch({
            type: 'SET_ITEM',
            item: r.item,
          });
        });
      });
  };

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: 'SET_PLAYING',
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: 'SET_PLAYING',
        playing: true,
      });
    }
  };

  return (
    <div className='footer'>
      <div className='footer__left'>
        <img
          src={item?.album.images[0].url}
          alt={item?.name || ''}
          className='footer__albumLogo'
        />
        {item ? (
          <div className='footer__songInfo'>
            <h4>{item?.song}</h4>
            <p>{item?.artists.map((artist) => artist.name).join(',')}</p>
          </div>
        ) : (
          <div className='footer__songInfo'>
            {' '}
            <h4>No song is playing</h4> <p>...</p>{' '}
          </div>
        )}
      </div>
      <div className='footer__center'>
        <ShuffleIcon className='footer__green' />
        <SkipPreviousIcon className='footer__icon' onClick={skipPrevious} />
        {playing ? (
          <PauseCircleOutlineIcon
            fontSize='large'
            className='footer__icon'
            onClick={handlePlayPause}
          />
        ) : (
          <PlayCircleOutlineIcon
            fontSize='large'
            className='footer__icon'
            onClick={handlePlayPause}
          />
        )}
        <SkipNextIcon className='footer__icon' onClick={skipNext} />
        <RepeatIcon className='footer__green' />
      </div>
      <div className='footer__right'>
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider aria-labelledby='continious-slider' />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
