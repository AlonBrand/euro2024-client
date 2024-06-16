// ChatBox.js
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import io from 'socket.io-client';

const ChatBox = ({ onClose }) => {
  const socketUrl = process.env.SOCKET_URL
  console.log("🚀 ~ ChatBox ~ socketUrl:", socketUrl)

  const socket = io(socketUrl);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, [socket]);

  const sendMessage = () => {
    socket.send(message);
    setMessage('');
  };

  return (
    <Box sx={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        bgcolor: 'rgba(0, 0, 0, 0.2)', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        zIndex: 1300,
      }}>
      <Box sx={{ 
          position: 'relative', 
          width: 400, 
          height: 500, 
          border: 1, 
          borderColor: 'grey.300', 
          bgcolor: '#f0f0f0', // Change background color
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: '10px', // Add border radius for a more rounded look
          margin: "0px 1vh"
        }}>
        <IconButton
            sx={{ position: 'absolute', top: 12, right: 2, fontSize: '24px' }} // Adjust fontSize to make the button bigger
            onClick={onClose}
          >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" sx={{ p: 2, textAlign: 'center' }}>חירקושים של משחק</Typography>
        <List sx={{ flex: 1, overflowY: 'auto', p: 0 }}>
          {messages.map((msg, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText 
                primary={msg} 
                sx={{ 
                  fontSize: '16px', 
                  fontFamily: 'Arial', 
                  color: '#333', 
                  paddingLeft: '10px' // Add left padding for messages
                }} 
              /> 
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <Button variant="contained" color="primary" onClick={sendMessage} sx={{ ml: 1 }}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBox;
