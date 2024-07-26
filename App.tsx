import React, {useState, useEffect, useContext} from 'react';
import {Text, LogBox} from 'react-native';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './src/config/FirebaseConfig';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Login} from '@src/modules/auth';
import ContextWrapper from '@src/context/ContextWrapper';
import Context from '@src/context/Context';
import Profile from '@src/modules/Profile';
import Chats from '@src/modules/Chats';
import Photo from '@src/modules/Photo';
import {Ionicons} from 'react-native-vector-icons';
import Contacts from '@src/modules/Contacts';
import Chat from '@src/modules/Chat';
import ChatHeader from '@src/modules/auth/components/ChatHeader';
LogBox.ignoreLogs([
  'Setting a timer',
  'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
]);

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function App() {
  const [currUser, setCurrUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const {
    theme: {colors},
  } = useContext(Context);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setLoading(false);
      if (user) {
        console.log('🚀 ~ unsubscribe ~ user:', user);
        setCurrUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      {!currUser ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="signIn" component={Login} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.foreground,
              shadowOpacity: 0,
              elevation: 0,
            },
            headerTintColor: colors.white,
          }}>
          {!currUser?.displayName && (
            <Stack.Screen
              name="profile"
              component={Profile}
              options={{headerShown: false}}
            />
          )}
          <Stack.Screen
            name="home"
            options={{title: 'Whatsapp'}}
            component={Home}
          />
          <Stack.Screen
            name="contacts"
            options={{title: 'Select Contacts'}}
            component={Contacts}
          />
          <Stack.Screen
            name="chat"
            component={Chat}
            options={{headerTitle: props => <ChatHeader {...props} />}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
function Home() {
  const {
    theme: {colors},
  } = useContext(Context);
  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        return {
          tabBarLabel: () => {
            if (route.name === 'photo') {
              return <Ionicons name="camera" size={20} color={colors.white} />;
            } else {
              return (
                <Text style={{color: colors.white}}>
                  {route.name.toLocaleUpperCase()}
                </Text>
              );
            }
          },
          tabBarShowIcon: true,
          tabBarLabelStyle: {
            color: colors.white,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.white,
          },
          tabBarStyle: {
            backgroundColor: colors.foreground,
          },
        };
      }}
      initialRouteName="chats">
      <Tab.Screen name="photo" component={Photo} />
      <Tab.Screen name="chats" component={Chats} />
    </Tab.Navigator>
  );
}

function Main() {}

export default App;
