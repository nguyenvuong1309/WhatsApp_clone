import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './app-stack';

export const AppNavigation = () => (
  <NavigationContainer>
    <AppStack />
  </NavigationContainer>
);
