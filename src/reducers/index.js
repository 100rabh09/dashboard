import { combineReducers } from "redux";
import { persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import all reducers here
import { project } from "./ProjectReducer";
import { completedProject } from "./CompletedProjectReducer";

// include all whitelist reducer
const persistConfig = {
  timeout: 0,
  key: 'root',
  whitelist: ['project','completedProject'],
  storage,
};


// combineReducers: to make one big object called store
const rootReducer = combineReducers({
  project,completedProject
});

// rootReducer: main object thrown into store
export default persistReducer(persistConfig, rootReducer);
