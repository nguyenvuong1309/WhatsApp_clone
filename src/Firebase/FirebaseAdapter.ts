import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import app from '@react-native-firebase/app';
import crashlytics from '@react-native-firebase/crashlytics';
import remoteConfig from '@react-native-firebase/remote-config';
import firestore from '@react-native-firebase/firestore';
import {firebase as firebaseAppCheck} from '@react-native-firebase/app-check';
import storage from '@react-native-firebase/storage';
import {firebaseOptions} from './Config';

export const firebase = {
  analytics: analytics,
  messaging: messaging,
  auth: auth,
  database: database,
  app: app,
  crashlytics: crashlytics,
  remoteConfig: remoteConfig,
  firestore: firestore,
  firebaseAppCheck: firebaseAppCheck,
  storage,
};

export const initFirebase = async () => {
  await firebase.app.initializeApp(firebaseOptions);
};
