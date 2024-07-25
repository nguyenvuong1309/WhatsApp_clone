import React from 'react';

type Dispatch<T> = (action: T) => void;

export const DispatchContext = React.createContext<Dispatch<any>>(() => {});

export const DispatchContextProvider = DispatchContext.Provider;

export const DispatchContextConsumer = DispatchContext.Consumer;
