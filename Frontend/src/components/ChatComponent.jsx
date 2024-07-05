// src/components/ChatComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const ChatComponent = ({ appointmentId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // Connessione al server di Socket.IO
    const socket = io('http://localhost:3000/');

    useEffect(() => {
        // Ricevi i messaggi esistenti quando il componente viene montato
        fetchMessages();

        // Unisciti alla stanza di chat specifica
        socket.emit('joinRoom', { appointmentId });

        // Ascolta per i nuovi messaggi inviati
        socket.on('newMessage', (message) => {
            setMessages([...messages, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    // Funzione per recuperare i messaggi esistenti
    const fetchMessages = async () => {
        try {
            const response = await axios.get(`/chat/messages/${appointmentId}`);
            setMessages(response.data);
        } catch (error) {
            console.error('Errore nel recupero dei messaggi:', error);
        }
    };

    // Funzione per inviare un nuovo messaggio
    const sendMessage = async () => {
        try {
            const sender = 'Client'; // Puoi personalizzare il mittente come desideri
            const response = await axios.post('/chat/messages', {
                appointmentId,
                sender,
                message: newMessage,
            });
            setNewMessage('');
        } catch (error) {
            console.error('Errore nell\'invio del messaggio:', error);
        }
    };

    return (
        <div className="chat-component">
            <h2>Chat</h2>
            <div className="messages-container">
                {messages.map((msg) => (
                    <div key={msg.id} className="message">
                        <strong>{msg.sender}: </strong>
                        <span>{msg.message}</span>
                    </div>
                ))}
            </div>
            <div className="new-message-container">
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Scrivi un messaggio..."
                ></textarea>
                <button onClick={sendMessage}>Invia</button>
            </div>
        </div>
    );
};

export default ChatComponent;
