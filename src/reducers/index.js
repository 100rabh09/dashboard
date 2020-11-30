import { combineReducers } from "redux";
import { persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { projectReducer } from "./ProjectReducer";

const persistConfig = {
  timeout: 0,
  key: 'root',
  whitelist: ['project'],
  storage,
};


// combineReducers: to make one big object called store
const rootReducer = combineReducers({
  project: projectReducer,
});

// rootReducer: main object thrown into store
export default persistReducer(persistConfig, rootReducer);
