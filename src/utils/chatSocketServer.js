import * as io from 'socket.io-client';
const events = require('events');


class ChatSocketServer {
    
    socket = null
    eventEmitter = new events.EventEmitter();

    // Connecting to Socket Server
    establishSocketConnection(userId) {
        try {
            this.socket = io(`http://localhost:3000`, {
                query: `userId=${userId}`
            });
        } catch (error) {
            alert(`Something went wrong; Can't connect to socket server`);
        }
    }

    getCompanyList(userId) {
        this.socket.emit('chat-list', {
            userId: userId
        });
        this.socket.on('chat-list-response', (data) => {
            this.eventEmitter.emit('chat-list-response', data);
        });
    };
}

export default new ChatSocketServer()