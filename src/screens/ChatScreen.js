import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatMessages, addMessage } from '../redux/chatSlice';
import PushNotification from 'react-native-push-notification';

const ChatScreen = () => {
  const [newMessage, setNewMessage] = useState('');
  
  const dispatch = useDispatch();
  const { messages, status, error } = useSelector((state) => state.chat);
  
  // Fetch initial chat messages when the component mounts
  useEffect(() => {
    dispatch(fetchChatMessages());
  }, [dispatch]);
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Dispatch the new message
      dispatch(addMessage({ text: newMessage, user: 'You', timestamp: Date.now() }));

      // Trigger a push notification
      PushNotification.localNotification({
        channelId: 'chat-channel', // Specify the channel ID
        title: 'New Message',
        message: `You sent: ${newMessage}`,
        playSound: true,
        soundName: 'default',
      });

      // Clear the input after sending the message
      setNewMessage('');
    }
  };

  return (
    <View style={styles.container}>
      {status === 'loading' && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageUser}>{item.user}:</Text>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  messageUser: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  messageText: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
});

export default ChatScreen;
