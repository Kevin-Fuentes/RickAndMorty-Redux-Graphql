import { loginWithGoogle,singOutGoogle} from "../firebase";
import {retriveFavs,deleteFavorites} from './charsDuck'
// CONSTASNTES
const initialState = {
  loggedIn: false,
  fetching: false,
};
const LOGIN = "LOGIN";
const LOGIN_SUCESS = "LOGIN_SUCESS";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOG_OUT = "LOG_OUT"
//REDUCER
export default function reducer(state = initialState, action) {
  switch (action.type) {
     case LOG_OUT:
          return{
          ...initialState
     }



    case LOGIN:
      return { ...state, fetching: true };

    case LOGIN_ERROR:
      return { ...state, fetching: false, error: action.payload};

    case LOGIN_SUCESS:
      return { ...state, fetching: false, ...action.payload,loggedIn:true };
    default:
      return state;
  }
}
//Aux
export const saveStorage = (storage)=> {
  localStorage.storage = JSON.stringify(storage);
}

const deleteStorage = ()=>{
localStorage.removeItem('storage')
}
// ACTION (ACTION CREATOR)
export const logOutAction = ()=>(dispatch,getState)=>{
singOutGoogle()
dispatch({
type:LOG_OUT
})
deleteFavorites()(dispatch)
deleteStorage()
}


export const restoreSessionAction = ()=>dispatch =>{
let  storage = localStorage.getItem('storage')
storage = JSON.parse(storage)

if(storage && storage.user){
     dispatch({
          type:LOGIN_SUCESS,
          payload:storage.user
     })
}


}


export const doGoogleLoginAction = () => (dispatch, getState) => {
  dispatch({
    type: LOGIN,
  });
 
  return loginWithGoogle()
    .then((user) => {
      dispatch({
        type: LOGIN_SUCESS,
        payload: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
      });
      
     
      saveStorage(getState());
      retriveFavs()(dispatch,getState)
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_ERROR,
        payload: err.message,
      });
    });

  
};
