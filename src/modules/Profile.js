import {StatusBar} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from 'react-native';
import GlobalContext from '@src/context/Context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {pickImage, askForPermission, uploadImage} from '@src/utils/utils';
import {auth, db} from '../config/FirebaseConfig';
import {updateProfile} from '@firebase/auth';
import {doc, setDoc} from '@firebase/firestore';
import {useNavigation} from '@react-navigation/native';

export default function Profile() {
  const [displayName, setDisplayName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('granted');
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const status = await askForPermission();
      setPermissionStatus(status);
    })();
  }, []);

  const {
    theme: {colors},
  } = useContext(GlobalContext);

  async function handlePress() {
    const user = auth.currentUser;
    let photoURL;
    if (selectedImage) {
      const {url} = await uploadImage(
        selectedImage,
        `images/${user.uid}`,
        'profilePicture',
      );
      photoURL = url;
    }
    const userData = {
      displayName,
      email: user.email,
    };
    if (photoURL) {
      userData.photoURL = photoURL;
    }
    try {
      await Promise.all([
        updateProfile(user, userData),
        setDoc(doc(db, 'users', user.uid), {...userData, uid: user.uid}),
      ]);
    } catch (error) {
      console.log('🚀 ~ handlePress ~ error:', error);
    }
    navigation.navigate('home');
  }

  async function handleProfilePicture() {
    const result = await pickImage();
    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  }

  if (!permissionStatus) {
    return (
      <Text
        style={{
          alignSelf: 'center',
          paddingTop: 100,
        }}>
        Loading
      </Text>
    );
  }
  if (permissionStatus !== 'granted') {
    return <Text>You need to allow this permission</Text>;
  }
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          // paddingTop: Constants.statusBarHeight + 20,
          paddingTop: 40,
          padding: 20,
        }}>
        <Text style={{fontSize: 22, color: colors.foreground}}>
          Profile Info
        </Text>
        <Text style={{fontSize: 14, color: colors.text, marginTop: 20}}>
          Please provide your name and an optional profile photo
        </Text>
        <TouchableOpacity
          onPress={handleProfilePicture}
          style={{
            marginTop: 30,
            borderRadius: 120,
            width: 120,
            height: 120,
            backgroundColor: colors.background,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {!selectedImage ? (
            <MaterialCommunityIcons
              name="camera-plus"
              color={colors.iconGray}
              size={45}
            />
          ) : (
            <Image
              source={{uri: selectedImage}}
              style={{width: '100%', height: '100%', borderRadius: 120}}
            />
          )}
        </TouchableOpacity>
        <TextInput
          placeholder="Type your name"
          value={displayName}
          onChangeText={setDisplayName}
          style={{
            borderBottomColor: colors.primary,
            marginTop: 40,
            borderBottomWidth: 2,
            width: '100%',
          }}
        />
        <View style={{marginTop: 'auto', width: 80}}>
          <Button
            title="Next"
            color={colors.secondary}
            onPress={handlePress}
            disabled={!displayName}
          />
        </View>
      </View>
    </React.Fragment>
  );
}
