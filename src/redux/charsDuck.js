import axios from "axios";
import { updateDB, getFavs } from "../firebase";

//Constantes
const initialState = {
  fetching: false,
  array: [],
  favorites: [],
};
const URL = "https://rickandmortyapi.com/api/character";

const GET_CHARACTERS = "GET_CHARACTERS";

const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";

const GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";

const REMOVE_CHARACTER = "REMOVE_CHARACTER";

const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";

const GET_FAVS = "GET_FAVS";
const FAVS_SUCCESS = "FAVS_SUCCESS";
const FAVS_ERROR = "FAVS_ERROR";
const REMOVE_FAV = "REMOVE_FAV"
//Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_FAV:
      return{
        ...initialState,
     
      }


    case GET_FAVS:
      return { ...state, fetching: true };

    case FAVS_ERROR:
      return { ...state, fetching: false, error: action.payload};

    case FAVS_SUCCESS:
      return { ...state, fetching: false, favorites:action.payload };

    case ADD_TO_FAVORITES:
      return { ...state, ...action.payload };

    case GET_CHARACTERS:
      return { ...state, fetching: true };

    case GET_CHARACTERS_ERROR:
      return { ...state, fetching: false, error: action.payload };
    case GET_CHARACTERS_SUCCESS:
      return { ...state, array: action.payload, fetching: false };

    case REMOVE_CHARACTER:
      return { ...state, array: action.payload };

    default:
      return state;
  }
}

export const saveStorage = (storage)=> {
  localStorage.storage = JSON.stringify(storage);
}
//AUX
export const restoreSessionActionFV = ()=>dispatch =>{
  let  storage = localStorage.getItem('storage')
  storage = JSON.parse(storage)
  
  if(storage && storage.user){
       dispatch({
            type:FAVS_SUCCESS,
            payload:storage.chars.favorites
       })
  }

}

//Actions
export const deleteFavorites = ()=>(dispatch)=>{
dispatch({
  type:REMOVE_FAV
})

}

export const retriveFavs = () => async (dispatch, getState) => {

  dispatch({
    type: GET_FAVS,
  });

  const { uid } = getState().user;
  const resultado = await getFavs(uid) ;

  try {
    dispatch({ type: FAVS_SUCCESS, payload: resultado });
    
 
    
  } catch (error) {
    dispatch({
      type: FAVS_ERROR,
      payload: error.message,
    });
  }
};

export const addToFvoritesAction = () => (dispatch, getState) => {
  const { array, favorites } = getState().chars;
  const char = array.shift();
  favorites.push(char);
  const { uid } = getState().user;

  updateDB(favorites, uid);
  dispatch({
    type: ADD_TO_FAVORITES,
    payload: { array: [...array], favorites: [...favorites] },
  });
  saveStorage(getState())
};

export const getCharactersAction = () => (dispatch, getState) => {
  dispatch({
    type: GET_CHARACTERS,
  });

  return axios
    .get(URL)
    .then((res) => {
      dispatch({
        type: GET_CHARACTERS_SUCCESS,
        payload: res.data.results,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_CHARACTERS_ERROR,
        payload: err.response.data.error,
      });
    });
};

export const removeCharacterAction = () => (dispatch, getState) => {
  const { array } = getState().chars;
  array.shift();
  dispatch({
    type: REMOVE_CHARACTER,
    payload: [...array],
  });
};
