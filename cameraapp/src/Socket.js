import {io} from 'socket.io-client';
url = 'http://192.168.0.176:3001' //Put your IP
const socket = io(url, {
  secure: true,
});
//IP ADRESS REAL PHYSIC
export default socket;
