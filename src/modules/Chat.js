// @refresh reset
import {useRoute} from '@react-navigation/native';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {auth, db} from '../config/FirebaseConfig';
import GlobalContext from '../context/Context';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from '@firebase/firestore';
import {
  Actions,
  Bubble,
  GiftedChat,
  InputToolbar,
} from 'react-native-gifted-chat';
import {pickImage, uploadImage} from '@src/utils/utils';
import ImageView from 'react-native-image-viewing';

const randomId = nanoid();

export default function Chat() {
  const [roomHash, setRoomHash] = useState('');
  const [messages, setMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageView, setSeletedImageView] = useState('');
  const {
    theme: {colors},
  } = useContext(GlobalContext);
  const {currentUser} = auth;
  console.log('🚀 ~ Chat ~ currentUser:', currentUser);
  const route = useRoute();
  console.log('🚀 ~ Chat ~ route:', route);
  const room = route.params.room;
  console.log('🚀 ~ Chat ~ room:', room);
  const selectedImage = route.params.image;
  console.log('🚀 ~ Chat ~ selectedImage:', selectedImage);
  const userB = route.params.user;
  console.log('🚀 ~ Chat ~ userB:', userB);

  const senderUser = currentUser.photoURL
    ? {
        name: currentUser.displayName,
        _id: currentUser.uid,
        avatar: currentUser.photoURL,
      }
    : {name: currentUser.displayName, _id: currentUser.uid};

  const roomId = room ? room.id : randomId;
  console.log('🚀 ~ Chat ~ roomId:', roomId);

  const roomRef = doc(db, 'rooms', roomId);
  console.log('🚀 ~ Chat ~ roomRef:', roomRef);
  const roomMessagesRef = collection(db, 'rooms', roomId, 'messages');
  console.log('🚀 ~ Chat ~ roomMessagesRef:', roomMessagesRef);

  useEffect(() => {
    (async () => {
      if (!room) {
        const currUserData = {
          displayName: currentUser.displayName,
          email: currentUser.email,
        };
        if (currentUser.photoURL) {
          currUserData.photoURL = currentUser.photoURL;
        }
        const userBData = {
          displayName: userB.contactName || userB.displayName || '',
          email: userB.email,
        };
        if (userB.photoURL) {
          userBData.photoURL = userB.photoURL;
        }
        const roomData = {
          participants: [currUserData, userBData],
          participantsArray: [currentUser.email, userB.email],
        };
        try {
          await setDoc(roomRef, roomData);
        } catch (error) {
          console.log('🚀 ~ error:', error);
        }
      }
      const emailHash = `${currentUser.email}:${userB.email}`;
      setRoomHash(emailHash);
      if (selectedImage && selectedImage.uri) {
        await sendImage(selectedImage.uri, emailHash);
      }
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(roomMessagesRef, querySnapshot => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({type}) => type === 'added')
        .map(({doc}) => {
          const message = doc.data();
          return {...message, createdAt: message.createdAt.toDate()};
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback(
    messages => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
    },
    [messages],
  );

  async function onSend(messages = []) {
    const writes = messages.map(m => addDoc(roomMessagesRef, m));
    const lastMessage = messages[messages.length - 1];
    writes.push(updateDoc(roomRef, {lastMessage}));
    await Promise.all(writes);
  }

  async function sendImage(uri, roomPath) {
    const {url, fileName} = await uploadImage(
      uri,
      `images/rooms/${roomPath || roomHash}`,
    );
    const message = {
      _id: fileName,
      text: '',
      createdAt: new Date(),
      user: senderUser,
      image: url,
    };
    const lastMessage = {...message, text: 'Image'};
    await Promise.all([
      addDoc(roomMessagesRef, message),
      updateDoc(roomRef, {lastMessage}),
    ]);
  }

  async function handlePhotoPicker() {
    const result = await pickImage();
    if (!result.cancelled) {
      await sendImage(result.uri);
    }
  }

  console.log('🚀 ~ Chat ~ userB:', userB);
  console.log('🚀 ~ Chat ~ room:', room);
  console.log('🚀 ~ Chat ~ currentUser:', currentUser);
  console.log('🚀 ~ Chat ~ senderUser:', senderUser);
  console.log('🚀 ~ Chat ~ messages:', messages);

  return (
    <>
      {!(messages && senderUser && currentUser && room && userB) ? (
        <View>
          <Text
            style={{
              alignSelf: 'center',
              paddingTop: 400,
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            Cannot create chat because insufficient information
          </Text>
        </View>
      ) : (
        <ImageBackground
          resizeMode="cover"
          source={require('../../assets/chatbg.png')}
          style={{flex: 1, marginBottom: 30}}>
          <GiftedChat
            onSend={onSend}
            messages={messages}
            user={senderUser}
            renderAvatar={null}
            renderActions={props => (
              <Actions
                {...props}
                containerStyle={{
                  position: 'absolute',
                  right: 60,
                  bottom: 5,
                  zIndex: 9999,
                }}
                onPressActionButton={handlePhotoPicker}
                icon={() => (
                  <Image
                    source={require('../../assets/camera.png')}
                    style={{width: 30, height: 30}}
                  />
                )}
              />
            )}
            timeTextStyle={{right: {color: colors.iconGray}}}
            renderSend={props => {
              const {text, messageIdGenerator, user, onSend} = props;
              return (
                <TouchableOpacity
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 40,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 5,
                  }}
                  onPress={() => {
                    if (text && onSend) {
                      onSend(
                        {
                          text: text.trim(),
                          user,
                          _id: messageIdGenerator?.(),
                        },
                        true,
                      );
                    }
                  }}>
                  <Image
                    source={require('../../assets/send.png')}
                    style={{width: 25, height: 25}}
                  />
                </TouchableOpacity>
              );
            }}
            renderInputToolbar={props => (
              <InputToolbar
                {...props}
                containerStyle={{
                  marginLeft: 10,
                  marginRight: 10,
                  marginBottom: 2,
                  borderRadius: 20,
                  paddingTop: 5,
                }}
              />
            )}
            renderBubble={props => (
              <Bubble
                {...props}
                textStyle={{right: {color: colors.text}}}
                wrapperStyle={{
                  left: {
                    backgroundColor: colors.white,
                  },
                  right: {
                    backgroundColor: colors.tertiary,
                  },
                }}
              />
            )}
            renderMessageImage={props => {
              return (
                <View style={{borderRadius: 15, padding: 2}}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                      setSeletedImageView(props.currentMessage.image);
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{
                        width: 200,
                        height: 200,
                        padding: 6,
                        borderRadius: 15,
                        resizeMode: 'cover',
                      }}
                      source={{uri: props.currentMessage.image}}
                    />
                    {selectedImageView ? (
                      <ImageView
                        imageIndex={0}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                        images={[{uri: selectedImageView}]}
                      />
                    ) : null}
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </ImageBackground>
      )}
    </>
  );
}
