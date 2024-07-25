import {Text} from '@src/core/text';
import {TextInput, TextStyle, View} from 'react-native';

export const Login = () => {
  return (
    <View>
      <Text text={'login'} style={TXT_LOGIN} />
      <TextInput placeholder="email" />
      <TextInput placeholder="password" />
    </View>
  );
};

const TXT_LOGIN: TextStyle = {
  alignSelf: 'center',
};
