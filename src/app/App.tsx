import React from 'react';

import {View, ViewStyle} from 'react-native';
import {Home} from '@src/modules/home/page/Home';
import {AppNavigation} from './navigators/app-navigator';

export const App = () => {
  return (
    <View style={ROOT}>
      <AppNavigation />
    </View>
  );
};

const ROOT: ViewStyle = {
  flex: 1,
};
