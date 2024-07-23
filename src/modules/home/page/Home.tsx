import {Text} from '@src/core';
import {View, ViewStyle} from 'react-native';

export const Home = () => {
  return (
    <View style={ROOT}>
      <Text text={'Home'} />
    </View>
  );
};

const ROOT: ViewStyle = {
  alignItems: 'center',
  paddingTop: 200,
  backgroundColor: '#1E90FF',
};
