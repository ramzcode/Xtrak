import React, { useRef, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import WS from 'react-native-websocket';

const App = () => {
  const ws = useRef(null);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      if (ws.current && ws.current.send) {
        ws.current.send(inputText);
        setInputText('');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your message"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />
      <Button title="Send" onPress={handleSendMessage} />
      <WS
        ref={(ref) => {
          ws.current = ref;
        }}
        url="wss://ramzcode.tech"
        onOpen={() => {
          console.log('WebSocket connection opened');
        }}
        onMessage={(message) => {
          console.log('Received message:', message);
        }}
        onError={(error) => {
          console.error('WebSocket Error:', error);
        }}
        onClose={(event) => {
          console.log('WebSocket connection closed:', event);
        }}
        reconnect // Optional: enable auto-reconnection
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default App;