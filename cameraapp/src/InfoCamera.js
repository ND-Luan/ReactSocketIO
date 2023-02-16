import {useRef} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {NetworkInfo} from 'react-native-network-info';

const InfoCamera = ({route, navigation}) => {
  //const photo = route.params.photo ;
  // console.log(photo);
  const ipRef = useRef(null);
  NetworkInfo.getIPV4Address().then(ipv4Address => {
    ipRef.current = ipv4Address;

  });

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
          uri: 'file://',
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        style={{width: 200, height: 200}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text>IP: {ipRef.current}</Text>
    </View>
  );
};

export default InfoCamera;
