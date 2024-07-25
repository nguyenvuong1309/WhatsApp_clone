import React from 'react';
import {RootState, initState} from '../../app/stores';

export const StateContext = React.createContext<RootState>(initState);

export const StateContextProvider = StateContext.Provider;

export const StateContextConsumer = StateContext.Consumer;
