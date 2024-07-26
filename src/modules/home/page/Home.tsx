import React, {useState, useEffect, useContext} from 'react';
import Context from '@src/context/Context';
import {Text} from '@src/core/text';
import {View, ViewStyle} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Ionicons} from 'react-native-vector-icons';
import Chats from '@src/modules/Chats';
import Photo from '@src/modules/Photo';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

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

const ROOT: ViewStyle = {
  alignItems: 'center',
  paddingTop: 200,
  backgroundColor: '#1E90FF',
};
