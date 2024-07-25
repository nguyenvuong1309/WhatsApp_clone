import type {FirebaseAuthTypes} from '@react-native-firebase/auth';

export interface GlobalState {
  CURRENT_LANGUAGE: string;
  PROVIDER: FirebaseAuthTypes.UserInfo[];
}
