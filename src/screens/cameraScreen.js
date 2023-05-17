/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import {
  Text, TouchableOpacity, View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';

export default function CameraScreen() {
  const [permission, getPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [token, setToken] = useState(null);
  const [userID, setUserID] = useState(null);

  async function sendPicture(data) {
    const res = await fetch(data.uri);
    const blob = await res.blob();

    return fetch(`http://localhost:3333/api/1.0.0/user/${userID}/photo`, {
      method: 'POST',
      headers: {
        'X-authorization': token,
        'Content-Type': 'image/png',
      },
      body: blob,
    }).then((response) => (response)).catch((err) => (err));
  }

  async function takePicture() {
    if (camera) {
      const options = { quality: 0.5, base64: true, onPictureSaved: (data) => sendPicture(data) };
      // eslint-disable-next-line no-unused-vars
      const data = await camera.takePictureAsync(options);
    }
  }

  function LoadTokenID() {
    AsyncStorage.getItem('whatsthat_session_token').then((data) => {
      if (data !== null) {
        setToken(data);
      }
    }).catch(
      (error) => (error),
    );
    AsyncStorage.getItem('whatsthat_user_id').then((data) => {
      if (data !== null) {
        setUserID(data);
      }
    }).catch((error) => (error));
  }

  useEffect(() => {
    getPermission();
    LoadTokenID();
  });

  if (!permission || !permission.granted) {
    return (<Text>No permission sad</Text>);
  }
  return (
    <View style={styles.cameraContainer}>
      <Camera style={styles.camera} type={CameraType.front} ref={(ref) => setCamera(ref)}>
        <View>
          <TouchableOpacity
            style={styles.sProfileButtonContainer}
            onPress={() => { takePicture(); }}
          >
            <Text style={{ color: 'white' }}>take pic</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
