import {useRef, useEffect} from 'react';

const WS_PROTOCOL = `ws${window.location.protocol === 'https:' ? 's' : ''}:`;
const WS_HOST = window.location.hostname;
const WS_PORT = window.location.port === '3000' ? '8008' : window.location.port
const WS_PATH = `${window.location.port !== '3000' ? 'node/' : ''}seven_wonders`;
const WS_URI = `${WS_PROTOCOL}${WS_HOST}:${WS_PORT}/${WS_PATH}`;
const createSocket = (onError, onMessage, onOpen = () => {}) => {
  let socket;
  if (window.WebSocket) {
    socket = new window.WebSocket(WS_URI);
  } else if (window.MozWebSocket) {
    socket = new window.MozWebSocket(WS_URI);
  }
  socket.onmessage = onMessage;
  socket.onerror = onError;
  socket.onopen = onOpen;
  window.sock = socket
  return socket;
};

const useGameSocket = (displayMessage, parseMessage) => {
  const onError = (event) => {
    displayMessage({text: `ERROR: I'm sorry, something went wrong with the websocket!`, type: 'error'});
    console.error(event, event.data);
  };
  const onClose = () => {
    parseMessage({ data: JSON.stringify({messageType: 'disconnected'})});
  }
  const wsRef = useRef(null);
  const sendMessage = (data) => {
    // TODO: remove debugging log
    console.log('sending', data);
    if (wsRef.current == null || wsRef.current.readyState > 1) {
      console.log('first case');
      wsRef.current = createSocket(onError, parseMessage, () => { sendMessage(data) });
      wsRef.current.onclose = onClose;
    } else if (wsRef.current.readyState === 0) {
      console.log('second case');
      wsRef.current.onopen = () => {
        sendMessage(data)
      }
    } else {
      console.log('third case')
      wsRef.current.send(JSON.stringify(data));
    }
  };
  const login = (userName) => {
    // in case returning user get our ID from local storage, or blank and server will assign
    const id = localStorage.getItem(`_swID_${userName}`) || '';
    sendMessage({messageType: 'login', id, name: userName})
  };
  if (wsRef.current === null) {
    console.log('initialize')
    wsRef.current = createSocket(onError, parseMessage);
    wsRef.current.onclose = onClose;
  }
  return [login, sendMessage];
};

export default useGameSocket;
