
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import {auth} from '@react-native-firebase/auth';
import {firestore} from '@react-native-firebase/firestore';
import { Platform,Text } from 'react-native';

async function saveTokenToDatabase(token) {
  // Assume user is already signed in
  const userId = auth().currentUser.uid;

  // Add the token to the users datastore
  await firestore()
    .collection('users')
    .doc(userId)
    .update({
      tokens: firestore.FieldValue.arrayUnion(token),
    });
}

export default function App() {
  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        console.log('token is',token)
        return saveTokenToDatabase(token);
      
      });
    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
    });
  }, []);
   return(<Text>hello {}</Text>);
}

