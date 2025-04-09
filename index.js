/**
 *   Déclaration des variables nécessaires pour le code
 */
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const users = {};
const sockets = {};
const typingUsers = {};
const channels = new Map();
let updatedChannels = [];

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/avatars', express.static(path.join(__dirname, 'avatars')));

/**
 *   Redirection vers la page html
 */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

/**
 *   Gérer la connexion d'un nouvel utilisateur
 */
io.on('connection', (socket) => {
    // Gérer la connexion d'un nouvel utilisateur
    socket.on('new user', ({ username, avatarUrl }) => {
        users[socket.id] = { username, avatar: avatarUrl };
        sockets[username] = socket;
        io.emit('user connected', { username, avatar: avatarUrl });
        io.emit('online users', Object.values(users).map(user => ({ username: user.username, avatar: user.avatar })));
    });

    /**
     *   Gérer les messages du chat
     */
    socket.on('chat message', (msg) => {
        io.emit(
            'chat message',
            {
                username: users[socket.id].username,
                message: msg,
                avatar: users[socket.id].avatar
            });
    });


    /**
     *   Gestion des canaux de discussion, fonctionnalité qui ne fonctionne pas totalement
     */
    socket.on('create channel', (channelName) => {
        console.log(`Channel created: ${channelName}`); 
        channels.set(channelName, new Set());
        io.emit('channel list', Array.from(channels.keys()));
        io.emit('create channel', channelName);
        io.emit('chat message', { channel: 'Public group', message: `${channelName} created.` });
        updatedChannels.push(channelName);
        io.emit('channel update', updatedChannels);
        socket.emit('channel created', { channelName });
        console.log(`Channel "${channelName}" created.`);
    });
    socket.on('join channel', (channel) => {
        socket.join(channel);
        if (channel === 'Public group') {
            const defaultPublicMessage = `Welcome to the Public group!`;
            socket.emit('default public message', defaultPublicMessage);
        } else {
            socket.emit('channel message', { channel, message: channels.get(channel) });
        }
        io.emit('channel list', Array.from(channels.keys()));
    });
    socket.on('get channels', function () {
        socket.emit('channels update', Array.from(channels));
      });

    /**
     *   Gérer la déconnexion des users
     */
    socket.on('disconnect', () => {
        if (users[socket.id]) {
            const user = users[socket.id];
            delete users[socket.id];
            io.emit('user disconnected', { username: user.username, avatarUrl: user.avatar });
            io.emit('online users', Object.values(users).map(user => ({ username: user.username, avatar: user.avatar })));
        }
    });

    /**
     *   Gérer les messages privés
     */
    socket.on('private message', ({ recipient, message }) => {
        const sender = users[socket.id];
        const recipientSocket = sockets[recipient];

        if (recipientSocket) {
            recipientSocket.emit('private message', {
                sender: { username: sender.username, avatar: sender.avatar },
                message
            });
        }
    });

    /**
     * Gère l'affichage de "user est en train d'écrire"
     */
    socket.on('typing', (isTyping) => {
        const username = users[socket.id].username;
        if (isTyping) {
            typingUsers[socket.id] = username;
        } else {
            delete typingUsers[socket.id];
        }
        io.emit('user typing', Object.values(typingUsers));
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
