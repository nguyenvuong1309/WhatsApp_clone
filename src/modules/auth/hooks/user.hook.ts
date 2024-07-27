// import {DispatchContext} from '@src/context/dispatch_context';
// import {StateContext} from '@src/context/state_context';
// import {Dispatch, useContext} from 'react';

// export const useUserState = () => {
//   const context = useContext(StateContext);
//   const dispatch = useContext(DispatchContext) as Dispatch<any>;
//   if (context === undefined) {
//     throw new Error('useUserState must be used within a Provider');
//   }
// };

import {useEffect, useState} from 'react';
import * as Contacts from 'react-native-contacts';
import {PermissionsAndroid, Platform} from 'react-native';
import {collection, query, where} from '@firebase/firestore';
import {db} from '../../../config/FirebaseConfig';
import {getDocs} from 'firebase/firestore';

export default function useContacts() {
  const [contacts, setContacts] = useState<
    {contactName: string; email: string; photoURL?: string}[]
  >([]);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
            buttonPositive: 'Please accept bare mortal',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          loadContacts();
        }
      } else {
      }

      try {
        const usersQuery = query(collection(db, 'users'));
        const snapshot = await getDocs(usersQuery);
        const users = snapshot.docs.map(
          doc =>
            doc.data() as {
              contactName: string;
              email: string;
              photoURL?: string;
            },
        );
        setContacts(users);
        return;
      } catch (error) {
        console.log('🚀 ~ error:', error);
      }
      setContacts([
        {
          contactName: 'vuong',
          email: 'vuong@gmail.com',
          photoURL:
            'https://i.pinimg.com/originals/3e/ff/83/3eff83844bff011c36cadb226d72e4d8.jpg',
        },
        {
          contactName: 'thu',
          email: 'thu@gmail.com',
          photoURL:
            'https://i.pinimg.com/originals/1c/90/cc/1c90cc9508d99b9f31cd9d623a5b03e3.jpg',
        },
        {
          contactName: 'anhthu',
          email: 'anhthu@gmail.com',
          photoURL: 'https://pbs.twimg.com/media/Do3r1V4VsAAstr2.jpg:large',
        },
      ]);
    })();
  }, []);

  const loadContacts = () => {
    Contacts.getAll()
      .then(data => {
        if (data.length > 0) {
          setContacts(
            data
              ?.filter(
                c =>
                  c.givenName &&
                  c.emailAddresses &&
                  c.emailAddresses[0] &&
                  c.emailAddresses[0].email,
              )
              .map(mapContactToUser),
          );
        }
      })
      .catch(e => {
        console.log('🚀 ~ loadContacts ~ e:', e);
      });
  };

  return contacts;
}

function mapContactToUser(contact: any) {
  return {
    contactName:
      contact.givenName && contact.familyName
        ? `${contact.givenName} ${contact.familyName}`
        : contact.givenName,
    email: contact.emailAddresses[0].email,
  };
}

