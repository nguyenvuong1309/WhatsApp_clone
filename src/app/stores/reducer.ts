import {createReducer} from 'typesafe-actions';

import {GlobalActionsType, globalActions} from './actions';
import {GlobalState} from './types';

export const initGlobalState: GlobalState = {
  PROVIDER: [],
  CURRENT_LANGUAGE: '',
};

export const globalReducer = createReducer<GlobalState, GlobalActionsType>(
  initGlobalState,
)
  .handleAction(globalActions.setGlobal, (state, action): GlobalState => {
    return {
      ...state,
      ...action.payload.global,
    };
  })
  .handleAction(globalActions.setLanguage, (state, action): GlobalState => {
    return {
      ...state,
      CURRENT_LANGUAGE: action.payload.lang,
    };
  });
