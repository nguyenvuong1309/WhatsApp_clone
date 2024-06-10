import React from 'react';
import {View, Text, ViewStyle, TextStyle} from 'react-native';

const App = () => {
  return (
    <View style={CONTAINER}>
      <Text style={TXT}>Vuong</Text>
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF',
};
const TXT: TextStyle = {
  fontSize: 20,
  textAlign: 'center',
  margin: 10,
};

export default App;
