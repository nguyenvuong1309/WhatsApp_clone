import {DispatchContext} from '@src/context/dispatch_context';
import {StateContext} from '@src/context/state_context';
import {Dispatch, useContext} from 'react';

export const useUserState = () => {
  const context = useContext(StateContext);
  const dispatch = useContext(DispatchContext) as Dispatch<any>;
  if (context === undefined) {
    throw new Error('useUserState must be used within a Provider');
  }
};
