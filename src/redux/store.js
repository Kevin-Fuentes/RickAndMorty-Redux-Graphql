import {createStore,combineReducers,compose,applyMiddleware} from 'redux'; 
import userReducer,{restoreSessionAction} from './userDuck';
import charsReducer,{getCharactersAction,restoreSessionActionFV} from './charsDuck'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
     user:userReducer,
     chars:charsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
     const store =  createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))
     getCharactersAction()(store.dispatch,store.getState)
     restoreSessionAction()(store.dispatch)
      restoreSessionActionFV()(store.dispatch)
     return store
}