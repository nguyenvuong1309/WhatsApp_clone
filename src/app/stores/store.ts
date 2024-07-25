import {combineReducers} from 'redux';
//import { userReducer,initUserState } from '@modules/setting';
import {globalReducer, initGlobalState} from './reducer';

export const rootReducer = combineReducers({
  //user: userReducer,
  global: globalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const initState: RootState = {
  global: initGlobalState,
  //user: initUserState,
};
