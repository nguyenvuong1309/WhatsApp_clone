import React from 'react';
import {App} from '@src/app/App';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppContextWrapper} from '../context';
import {ViewStyle} from 'react-native';

export const AppProvier = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={ROOT}>
        <AppContextWrapper>
          <App />
        </AppContextWrapper>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const ROOT: ViewStyle = {
  flex: 1,
};
