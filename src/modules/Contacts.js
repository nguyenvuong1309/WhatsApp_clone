import {collection, onSnapshot, query, where} from '@firebase/firestore';
import {useRoute} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import ListItem from '@src/modules/auth/components/ListItem';
import GlobalContext from '../context/Context';
import {db} from '@src/config/FirebaseConfig';
import useContacts from '@src/modules/auth/hooks/user.hook';

export default function Contacts() {
  const contacts = useContacts();
  const route = useRoute();
  const image = route.params && route.params.image;
  return (
    <>
      {!contacts ? (
        <View>
          <Text>Don't have any contact</Text>
        </View>
      ) : (
        <FlatList
          style={{flex: 1, padding: 10}}
          data={contacts}
          keyExtractor={(_, i) => i}
          renderItem={({item}) => (
            <ContactPreview contact={item} image={image} />
          )}
        />
      )}
    </>
  );
}

function ContactPreview({contact, image}) {
  const {unfilteredRooms, rooms} = useContext(GlobalContext);
  const [user, setUser] = useState(contact);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const q = query(
        collection(db, 'users'),
        where('email', '==', contact.email),
      );
      const unsubscribe = onSnapshot(q, snapshot => {
        if (snapshot.docs.length) {
          const userDoc = snapshot.docs[0].data();
          setUser(prevUser => ({...prevUser, userDoc}));
        }
      });
      return () => unsubscribe();
    } catch (error) {
      setError(error);
      console.log('🚀 ~ useEffect ~ error:', error);
    }
  }, []);
  return (
    <>
      {error ? (
        <View>
          <Text>{JSON.stringify(error)}</Text>
        </View>
      ) : (
        <ListItem
          style={{marginTop: 7}}
          type="contacts"
          user={user}
          image={image}
          room={unfilteredRooms.find(room =>
            room.participantsArray.includes(contact.email),
          )}
        />
      )}
    </>
  );
}
