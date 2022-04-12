import { io } from 'socket.io-client';

let socket = io('ws://localhost:8888', {
	transports: [ 'websocket' ],
	allowEIO3: true
});

socket.emit('sendMsg', '客户端发送信息');
