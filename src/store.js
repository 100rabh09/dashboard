import {applyMiddleware, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import {persistStore} from 'redux-persist';
import rootReducer from './reducers';
import logger from 'redux-logger';



const middlewares = [ReduxThunk, logger];
const  store = createStore(rootReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

export {store, persistor};
