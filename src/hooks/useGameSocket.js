import {useRef, useEffect, useReducer} from 'react';

const WS_PROTOCOL = `ws${window.location.protocol === 'https;' ? 's' : ''}:`;
const WS_HOST = window.location.hostname;
const WS_PATH = `${window.location.port === '3000' ? 'dev_' : ''}node/seven_wonders`;
const WS_URI = `${WS_PROTOCOL}${WS_HOST}/${WS_PATH}`;
const createSocket = () => {
  if (window.WebSocket) return new window.WebSocket(WS_URI);
  else if (window.MozWebSocket) return new window.MozWebSocket(WS_URI);
};

const useGameSocket = ({displayMessage, parseMessage}) => {
  const wsRef = useRef(null);
  const onError = (event) => {
    displayMessage({text: `ERROR: I'm sorry, something went wrong with the websocket!`, type: 'error'});
    console.error(event, event.data);
  };
  // ensure WS is ready before using it!
  const wsReady = () => {
    return wsRef.current && wsRef.current.readyState === 1;
  };
  const sendMessage = (data) => {
    // TODO: remove debugging log
    console.log('sending', data);
    wsReady() && wsRef.current.send(JSON.stringify(data));
  };
  const login = (userName) => {
    // in case returning user get our ID from local storage, or blank and server will assign
    const id = localStorage.getItem(`_swID_${userName}`) || '';
    // if login happens before its ready, use onopen, otherwise just send message
    wsReady() ?
      sendMessage({messageType: 'login', id, name: userName}) :
      wsRef.current.onopen = () => {
        sendMessage({messageType: 'login', id, name: userName});
      };
  };
  // create socket once, and close it when it powers down
  useEffect(() => {
    wsRef.current = createSocket();
    // close socket when component unmounts
    return wsRef.current.close;
  }, []);
  // rebind listeners each time the methods change
  useEffect(() => {
    wsRef.current.onmessage = parseMessage;
    wsRef.current.onerror = onError;
  }, [parseMessage, onError]);
  return [login, sendMessage];
};

export default useGameSocket;
