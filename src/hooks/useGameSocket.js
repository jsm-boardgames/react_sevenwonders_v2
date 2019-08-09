import {useRef, useEffect} from 'react';

const WS_PROTOCOL = `ws${window.location.protocol === 'https;' ? 's' : ''}:`;
const WS_HOST = window.location.hostname;
const WS_PATH = `${window.location.port === '3000' ? 'dev_' : ''}node/seven_wonders`;
const WS_URI = `${WS_PROTOCOL}${WS_HOST}/${WS_PATH}`;
const createSocket = () => {
  if (window.WebSocket) return new window.WebSocket(WS_URI);
  else if (window.MozWebSocket) return new window.MozWebSocket(WS_URI);
};

const useGameSocket = ({onMessage, onError}) => {
  const wsRef = useRef(null);
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
  useEffect(() => {
    wsRef.current = createSocket();
    wsRef.current.onmessage = onMessage;
    wsRef.current.onerror = onError;
    // close socket when component unmounts
    return wsRef.current.close;
    // if using the onMessage/onError to see if it needs to be re-run, make sure to use useCallback
    // or this will run on each render of app... since only using call once on startup use empty array of dependancies instead
  }, [/*onMessage, onError*/]);
  return [login, sendMessage];
};

export default useGameSocket;
