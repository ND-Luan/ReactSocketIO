import {useRef, useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import socket from './Socket';

const InfoCamera = ({ navigation}) => {
  //const photo = route.params.photo ;
  // console.log(photo);
  const [data, setData] = useState();

  useEffect(() => {
    socket.on('recive_accpect', data => {
      setData(data);
      console.log(data);
    });
    socket.on('recive_cancel', data => {
      setData(data);
      console.log(data);
    });
  }, [socket]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10,
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('CameraApp')}
        style={{
          justifyContent: 'center',
          alignItems: 'center',

          backgroundColor: 'black',
          width: 200,
          height: 100,
          borderRadius: 10,
        }}>
        <Text style={{color: 'white'}}>Navigate Camera</Text>
      </TouchableOpacity>
      <FastImage
        source={{
          uri: data == undefined ? null : data.data.url,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        style={{width: 200, height: 200}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text>{data == undefined ? null : data.data.message}</Text>
    </View>
  );
};

export default InfoCamera;
