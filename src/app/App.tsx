import React from 'react';

import {View, ViewStyle} from 'react-native';
import {Home} from '@src/modules/home/page/Home';

export const App = () => {
  return (
    <View style={ROOT}>
      <Home />
    </View>
  );
};

const ROOT: ViewStyle = {
  flex: 1,
};
