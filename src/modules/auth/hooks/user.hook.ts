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
import Contacts from 'react-native-contacts';
import {PermissionsAndroid, Platform} from 'react-native';

export default function useContacts() {
  const [contacts, setContacts] = useState([]);

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
        loadContacts();
      }
    })();
  }, []);

  const loadContacts = () => {
    Contacts.getAll()
      .then(data => {
        if (data.length > 0) {
          setContacts(
            data
              .filter(
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
        console.log(e);
      });
  };

  return contacts;
}

function mapContactToUser(contact) {
  return {
    contactName:
      contact.givenName && contact.familyName
        ? `${contact.givenName} ${contact.familyName}`
        : contact.givenName,
    email: contact.emailAddresses[0].email,
  };
}
