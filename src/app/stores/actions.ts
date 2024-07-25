import {ActionType} from 'typesafe-actions';
import {createAction} from 'typesafe-actions';

const setGlobal = createAction('global/setGlobal', (global: any) => ({
  global,
}))();
const setLanguage = createAction('global/setLanguage', (lang: string) => ({
  lang,
}))();

export const globalActions = {
  setGlobal,
  setLanguage,	
};

export type GlobalActionsType = ActionType<typeof globalActions>;
