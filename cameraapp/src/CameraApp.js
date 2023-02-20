import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useEffect, useState, useRef} from 'react';

import {
  Camera,
  useCameraDevices,
  CameraPermissionStatus,
  useFrameProcessor,
} from 'react-native-vision-camera';
import storage from '@react-native-firebase/storage';
import socket from './Socket';
import {NetworkInfo} from 'react-native-network-info';
function CameraApp({navigation}) {
  const [hasPermission, setHasPermission] = useState(false);
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);
  const cameraRef = useRef(null);

  const devices = useCameraDevices('wide-angle-camera');

  const device = devices.front;

  if (device == null) return <Text style={{color: 'white'}}>Loading</Text>;

  const handleBarCodeScanned = async () => {
    try {
      if (cameraRef.current == null) throw new Error('Camera ref is null!');
      const photo = await cameraRef.current.takePhoto();
      return photo;
    } catch (error) {
      console.log(error.message);
    }
  };

  NetworkInfo.getIPV4Address().then(ipv4Address => {
    console.log(ipv4Address);
  });

  const sendImg = url => {
    socket.emit('send_img', {url: url});
  };
  //console.log(cameraRef.current);
  return device && hasPermission ? (
    <View style={{flex: 1}}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        torch={'off'}
      />
      <View
        style={{
          flex: 1,

          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={async () => {
            var photo = await handleBarCodeScanned();
            const reference = storage().ref('img');

            await reference.putFile(photo.path);

            const url = await storage().ref('img').getDownloadURL();
            sendImg(url);
            navigation.navigate('InfoCamera', {url: url});
          }}
          style={{
            width: 100,
            height: 50,
            backgroundColor: 'black',
            marginTop: 400,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>Capture</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : null;
}

export default CameraApp;
