import React from 'react';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import './Body.css';
import Header from './Header';
import { useDataLayerValue } from './DataLayer';
import SongRow from './SongRow';

const Body = () => {
  const [{ discover_weekly, spotify, playing }, dispatch] = useDataLayerValue();
  const playPlaylist = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: 'SET_PLAYING',
        playing: false,
      });
    } else {
      spotify
        .play({
          context_uri: `spotify:playlist:${discover_weekly.id}`,
          device_id: localStorage.getItem('device_id'),
        })
        .then(() => {
          spotify.getMyCurrentPlayingTrack().then((r) => {
            dispatch({
              type: 'SET_ITEM',
              item: r.item,
            });
            dispatch({
              type: 'SET_PLAYING',
              playing: true,
            });
          });
        });
    }
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
        device_id: localStorage.getItem('device_id'),
      })
      .then(() => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: 'SET_ITEM',
            item: r.item,
          });
          dispatch({
            type: 'SET_PLAYING',
            playing: true,
          });
        });
      })
      .catch((err) => {
        console.log('err :>> ', err);
      });
  };

  return (
    <div className='body'>
      <Header />
      <div className='body__info'>
        <img src={discover_weekly?.images[0].url} alt='' />
        <div className='body__infoText'>
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>
      <div className='body__songs'>
        <div className='body__icons'>
          {playing ? (
            <PauseCircleFilledIcon
              className='body__shuffle'
              onClick={playPlaylist}
            />
          ) : (
            <PlayCircleFilledIcon
              className='body__shuffle'
              onClick={playPlaylist}
            />
          )}
          <FavoriteIcon fontSize='large' />
          <MoreHorizIcon />
        </div>
        {/* list of songs */}
        {discover_weekly?.tracks.items.map((item, index) => (
          <SongRow key={index} track={item.track} playSong={playSong} />
        ))}
      </div>
    </div>
  );
};

export default Body;
