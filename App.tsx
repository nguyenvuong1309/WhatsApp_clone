/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// if (!__DEV__) {
//   console.log = () => {};
//   console.error = () => {};
//   console.warn = () => {};
// }

import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import NormalTheme from './src/Themes/NormalTheme';
import {initFirebase} from '@src/Firebase';


EStyleSheet.build(NormalTheme);

// if (!__DEV__) {
//   console.log('This will be stripped in production.');
//   console.log = () => {};
//   console.error = () => {};
//   console.warn = () => {};
//   console.log('This will be stripped in dev.');
// }

initFirebase();

const App = () => {
  return (
   <>

   </>
  );
}


export default App;
