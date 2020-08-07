export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  // remove after finish developing....
  token:
    'BQC7IHVNmbE1O_0WDJyE3z8kPYr4qqFNR16b3QSeqBRV918-mJVvdmzCxO0fpjN5zgsR_3JOGf5zeX_nqrcXVJoPwNlLpz68kpKfu62zZY5LXD4nZWYAa2fO4mVw3XZfZRrwRMTz8dRmiVddfnMFqaFLyIl4VDbQ',
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};

export default reducer;
