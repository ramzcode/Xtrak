import React, { useState } from 'react';
import { View, Text } from 'react-native';
import WebSocket from 'react-native-websocket';

const App = () => {
  const [message, setMessage] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <WebSocket
        url="wss://echo.websocket.events"
        onMessage={(event) => setMessage(event.data)}
        onError={(error) => console.log(error)}
        onClose={(event) => console.log(event)}
        reconnect // Optional: enable auto-reconnection
      />
      <Text>WebSocket Message: {message}</Text>
    </View>
  );
};

export default App;

