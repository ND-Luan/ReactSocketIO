import {useEffect} from 'react';
import StackNavigation from './src/StackNavigation';

import io from 'socket.io-client';
const App = () => {
  const socket = io('http://192.168.0.176:3001'); //IP ADRESS REAL PHYSIC

  const sendImg = () => {
    //socket.emit();
  };
  return <StackNavigation />;
};
export default App;
