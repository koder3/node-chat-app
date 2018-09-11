const path = require('path')
const express = require('express');
const socketIO = require('socket.io')
const http = require('http')

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')
const app = express();
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('new user connected')
    
    socket.emit('newMessage', {
        from: 'admin',
        text: 'welcome to the chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'admin',
        text: 'new user joined'
    })

  


    socket.on('createMessage', (message) => {
        console.log('createMessage', message)
        io.emit('newMessage', {
            from: message.from,
            text: message.text
        })
        // socket.broadcast.emit('newMessage', {
        //     from: 'admin',
        //     text: 'new user joined',
        //     createdAt: new Date().getTime()
        // });

    })
    socket.on('disconnect', () => {
        console.log('disconnected from server')
    })
})




server.listen(port, () => {
    console.log(`Started on port ${port}`)
})
