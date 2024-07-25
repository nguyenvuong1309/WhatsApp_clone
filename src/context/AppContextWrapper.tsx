import type {ReactNode} from 'react';
import React, {useReducer} from 'react';
import {DispatchContextProvider} from './dispatch_context';
import {StateContextProvider} from './state_context';
import {RootState, rootReducer, initState} from '../app/stores';

export const AppContextWrapper = ({
  children,
  appState = initState,
}: {
  children: ReactNode;
  appState?: RootState;
}) => {
  const [state, dispatch] = useReducer(rootReducer, appState);
  return (
    <DispatchContextProvider value={dispatch}>
      <StateContextProvider value={state}>{children}</StateContextProvider>
    </DispatchContextProvider>
  );
};
