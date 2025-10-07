import { io } from 'socket.io-client';

const socketUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

const socket = io(socketUrl, {
  path: '/socket',
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('Websocket connected');
});

export { socket };
