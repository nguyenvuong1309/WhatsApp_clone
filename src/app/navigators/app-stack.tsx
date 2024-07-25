import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '@src/modules/auth';
import {SignUp} from '@src/modules/auth';

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={SignUp} />
    </Stack.Navigator>
  );
};
