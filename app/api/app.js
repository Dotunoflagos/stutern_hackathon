const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(cors(/*{
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: '*'
}*/));

const userSockets = new Map();
// WebSocket connection handling
wss.on('connection', (ws, req) => {
    // const userId = req.userId
    // if (!userId) {
    //     ws.close(1008, 'User ID not provided');
    //     return;
    // }
    console.log('A new WebSocket connection has been established.');

    // userSockets.set(userId, ws)
    // ws.on('close', () => {
    //     userSockets.delete(userId);
    // });
    ws.on('message', (message) => {
        console.log('Received message:', message.toString('utf8'));
    });

    ws.send(JSON.stringify({ message: 'WebSocket Connected!' }));
});

app.set('view engine', 'ejs');
require('dotenv').config();
require('./config/connection');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes prefix
app.use('/api/v1', userRoutes);
app.use('/api/v1', clientRoutes);
app.use('/api/v1', invoiceRoutes);

const port = process.env.PORT || 3030;
server.listen(port, () => {
    console.log(`listening to: http://localhost:${port}`)
})

// app.listen(port, () => {
//     console.log(`listening to: http://localhost:${port}`)
// })
