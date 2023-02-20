import {useEffect} from 'react';
import StackNavigation from './src/StackNavigation';

import io from 'socket.io-client';
import socket from './src/Socket';
const SOCKET = socket;
const App = () => {
  return <StackNavigation />;
};
export default App;
