import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CameraApp from './CameraApp';
import InfoCamera from './InfoCamera';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer
    >
      <Stack.Navigator initialRouteName='InfoCamera'>
        <Stack.Screen name="CameraApp" component={CameraApp}></Stack.Screen>
        <Stack.Screen name="InfoCamera" component={InfoCamera}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigation;
