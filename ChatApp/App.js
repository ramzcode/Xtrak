import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';

const SERVER_URL = 'ws://192.168.1.105:8765'; // Update this with your server URL

const App = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();

  const connectToWebSocket = () => {
    const socket = new WebSocket(SERVER_URL);
    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };
    socket.onmessage = (event) => {
      // Update the messages list with the new message
      setMessages(prevMessages => [...prevMessages, event.data]);
      // Scroll to the end of the ScrollView (auto-scroll)
      scrollViewRef.current.scrollToEnd({ animated: true });
    };
    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
    return socket;
  };

  const socketRef = useRef();

  useEffect(() => {
    // Initialize the WebSocket connection
    socketRef.current = connectToWebSocket();
    // Clean up WebSocket connection when the component is unmounted
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current && message) {
      // Send the message to the server
      socketRef.current.send(message);
      // Clear the input field
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messagesWindow} ref={scrollViewRef}>
        {messages.map((msg, index) => (
          <Text key={index} style={styles.messageText}>
            {msg}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 10,
    paddingTop: 5,
  },
  messagesWindow: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  },
  messageText: {
    padding: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  inputField: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default App;

