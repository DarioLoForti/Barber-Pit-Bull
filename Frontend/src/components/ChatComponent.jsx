import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Assicurati che l'URL sia corretto

const Chat = ({ user }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Connetti alla stanza dell'utente (o un'altra logica di stanza)
        const appointmentId = '1'; // Sostituisci con l'ID reale dell'appuntamento
        socket.emit('joinRoom', { appointmentId });

        // Ricevi nuovi messaggi
        socket.on('newMessage', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // Cleanup
        return () => {
            socket.off('newMessage');
        };
    }, []);

    const sendMessage = () => {
        const newMessage = {
            appointmentId: '1', // Sostituisci con l'ID reale dell'appuntamento
            sender: user || 'admin', // Utilizza il mittente passato come prop o 'admin' come fallback
            message: message,
        };

        socket.emit('sendMessage', newMessage);
        setMessage('');
    };

    return (

        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="chat">
                        <div className="chat-messages">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`message ${msg.sender === 'admin' ? 'admin' : 'user'}`}>
                                    <p>{msg.message}</p>
                                    <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                                </div>
                            ))}
                        </div>
                        <div className="chat-input">
                            <input
                                type="text"
                                placeholder="Scrivi un messaggio..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button onClick={sendMessage}>Invia</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Chat;
