import React, {useContext} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import GlobalContext from '../../../context/Context';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
export default function ContactsFloatingIcon() {
  const {
    theme: {colors},
  } = useContext(GlobalContext);
  const navigation = useNavigation();
  const navigationToContracts = () => {
    if (!navigation) {
      console.log('🚀 ~ navigationToContracts ~ navigation: error');
      return null;
    }
    if (navigation.navigate) {
      navigation.navigate('contacts');
    }
  };
  return (
    <TouchableOpacity
      onPress={navigationToContracts}
      style={{
        position: 'absolute',
        right: 20,
        bottom: 20,
        borderRadius: 60,
        width: 60,
        height: 60,
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={require('../../../../assets/message.png')}
        style={{width: 30, height: 30}}
      />
    </TouchableOpacity>
  );
}
