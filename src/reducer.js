export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  // remove after finish developing....
  token:
    'BQC2zQxfjXd6ysDxYuspLonRYCvIzDdfdSTsPl8fs_LCugsxzZoibjP0YOf5iHAtjqv7ND87',
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
    case 'SET_PLAYLISTS':
      return {
        ...state,
        playlists: action.playlists,
      };
    default:
      return state;
  }
};

export default reducer;
