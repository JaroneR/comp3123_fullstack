const rooms = ['Main room', 'Miscellaneous room'];
const users = {};
const fs = require('fs');
const User = require('../models/Users.js');
const Chat = require('../models/Chat.js');
const Sockio = require('../models/Sockets.js');
const Elog = require('../models/Events.js');

module.exports = (io)=>{
    io.sockets.on('connection', (socket)=> {
    //store event
        const connectEvent=new Elog({type:'CONNECTION', socket:socket.id, room:'Lobby'})
        connectEvent.save((err)=>{
                if (err) throw err;
                     console.log('\n-----STORING EVENT INTO THE DATABASE-----\nSocket: '+connectEvent.socket+'\nWith type: '+connectEvent.type+"\nHas been connected @: "+ connectEvent.connect +'\nIn the: '+connectEvent.room+'\nSaved to database at: '+ connectEvent.connect)
            })
        //creates a txt file of the event
            fs.appendFile('./eventLog.txt', connectEvent.type+" has been started @ "+ connectEvent.connect +' for socket '+connectEvent.socket+'in the '+connectEvent.room+"\n", {'flags': 'a'},(err)=>{
                if (err) throw err;
            })            

        socket.on('new user',  (data ,callback) =>{ 
        //if a user exists in the dictionary, return an error message to client
            if (data in users){
                callback(false);
            }
            else {
            //if a new user exits, create one, store in dictionary
                callback(true);
                socket.nickname = data;
                users[socket.nickname] = socket;
                updateNicknames();
            //store in database
                const newUser = new User({username: data, password: data})
                newUser.save((err)=>{
                    if (err) throw err;
                console.log('\n-----STORING THE USER INTO THE DATABASE-----\nUser: '+newUser.username+"\nPassword: "+newUser.password+"\nSaved to database")
                })
            //stores new socket
                const newSock=new Sockio({socket_id:socket.id, createdBy:newUser.username})
                newSock.save((err)=>{
                    if (err) throw err;
                    console.log('\n-----STORING THE SOCKET INTO THE DATABASE-----\nSocket: '+newSock.socket_id+"\nCreated by: "+ newSock.createdBy+"\nSaved to database at: "+ newSock.connectTime)
                })
            //store event
                const newUserEvent=new Elog({type:'NEW USER',name:newUser.username, socket:socket.id, room:'Main Room'})
                newUserEvent.save((err)=>{
                    if (err) throw err;
                    console.log('\n-----STORING THE EVENT INTO THE DATABASE-----\nEvent Type: '+newUserEvent.type+'\nCreated by: ' + newUserEvent.name + '\nFor Socket: '+newUserEvent.socket+'\nIn the: '+newUserEvent.room+'\nSaved to database at: '+ newUserEvent.connect)
                })
            //creates a txt file of the event
                fs.appendFile('./eventLog.txt', newUserEvent.socket+" has been created @ "+ newUserEvent.connect +" and created by "+ newUserEvent.name +' in the '+newUserEvent.room+"\n", {'flags': 'a'},(err)=>{
                    if (err) throw err;
                })
                socket.room = 'Main room';
            // add the users's username to the global list
            // send user to Main room
                socket.join('Main room');
            // echo to user they've connected
            // echo to Main room that another user has connected to their room
                socket.emit('updatechat', 'Cortana:', 'you have connected to Main room');
                socket.broadcast.to('Main room').emit('updatechat', 'Cortana:', socket.nickname + ' has connected to this room');
                socket.emit('updaterooms', rooms, 'Main room');
        }
    })

    const updateNicknames=()=> {
        io.sockets.emit('usernames', Object.keys(users));
    }


    //save messages to the database
    socket.on('send message',  (data)=> {
        
        //store new message event
            const newMessageEvent=new Elog({type:'MESSAGE SENT', name:socket.nickname, socket:socket.id, room:socket.room})
            newMessageEvent.save((err)=>{
                if (err) throw err;
                console.log('\n-----STORING THE EVENT INTO THE DATABASE-----\nEvent Type: '+newMessageEvent.type+'\nCreated by: ' + newMessageEvent.name + '\nFor Socket: '+newMessageEvent.socket+'\nIn the: '+newMessageEvent.room+'\nSaved to database at: '+ newMessageEvent.connect)
            })
        //creates a txt file of the event
            fs.appendFile('./eventLog.txt', newMessageEvent.socket+" has sent a new message @ "+ newMessageEvent.connect +" and created by "+ newMessageEvent.name +' in the '+newMessageEvent.room+"\n", {'flags': 'a'},(err)=>{
                if (err) throw err;
            })
            const msg = data.trim();
            const newMsg = new Chat({msg: msg, nick: socket.nickname, room: socket.room})
            newMsg.save( (err) =>{
                if (err) throw err;
                console.log('\n-----STORING MESSAGE INTO THE DATABASE-----\nMessage: '+msg+'\nSent by: ' + socket.nickname + '\nIn Room: '+socket.room)
                io.sockets.in(socket.room).emit('new message', {msg: msg, nick: socket.nickname, room: socket.room})
            })
        //}
    })
    //handle the switching of rooms
    socket.on('switchRoom', (newroom)=>{
        socket.leave(socket.room);
    //store leave room event
        const leaveRoomEvent=new Elog({type:'LEAVE ROOM', name:socket.nickname, socket:socket.id, room:socket.room})
        leaveRoomEvent.save((err)=>{
            if (err) throw err;
            console.log('\n-----STORING THE EVENT INTO THE DATABASE-----\nEvent Type: '+leaveRoomEvent.type+'\nCreated by: ' + leaveRoomEvent.name + '\nFor Socket: '+leaveRoomEvent.socket+'\nIn the: '+leaveRoomEvent.room+'\nSaved to database at: '+ leaveRoomEvent.connect)
        })
        fs.appendFile('./eventLog.txt', leaveRoomEvent.socket+" has left "+ leaveRoomEvent.room +" and created by "+ leaveRoomEvent.name +' @ '+leaveRoomEvent.connect+"\n", {'flags': 'a'},(err)=>{
            if (err) throw err;
        })
        socket.join(newroom);
    //store join room event
        const joinRoomEvent=new Elog({type:'JOIN ROOM', name:socket.nickname, socket:socket.id, room:newroom})
        joinRoomEvent.save((err)=>{
            if (err) throw err;
            console.log('\n-----STORING THE EVENT INTO THE DATABASE-----\nEvent Type: '+joinRoomEvent.type+'\nCreated by: ' + joinRoomEvent.name + '\nFor Socket: '+joinRoomEvent.socket+'\nIn the: '+joinRoomEvent.room+'\nSaved to database at: '+ joinRoomEvent.connect)
        })
        fs.appendFile('./eventLog.txt', joinRoomEvent.socket+" has joined "+ joinRoomEvent.room +" and created by "+ joinRoomEvent.name +' @ '+joinRoomEvent.connect+"\n", {'flags': 'a'},(err)=>{
            if (err) throw err;
        })
        socket.emit('updatechat', 'Cortana:', 'you have connected to '+ newroom);
    // sent message to old room
        socket.broadcast.to(socket.room).emit('updatechat', 'Cortana:', socket.nickname+' has left this room');
    // update socket session room title
        socket.room = newroom;
    //let users know new user has joined the room
        socket.broadcast.to(newroom).emit('updatechat', 'Cortana:', socket.nickname+' has joined this room');
        socket.emit('updaterooms', rooms, newroom);
    });
    //when a user disconnects
    socket.on('disconnect',  (data) =>{
    if (!socket.nickname) return;
    //remove username from dictionary to allow its reuse
    delete  users[socket.nickname];
        Sockio.find({socket_id:socket.id},(err,socks)=>{
            if (err) throw err;
            //update disconnect time for socket in database 
            socks.forEach((sock)=> { 
                sock.disconnectTime=new Date();
                //save the update
                sock.save((err)=>{
                    if (err) throw err;
                    console.log( "\n-----UPDATE SOCKET DISCONNECT INTO THE DATABASE-----\nSocket_id: " + sock.socket_id + "\nNew disconnectTime: " + sock.disconnectTime + "\nSAVED" );
                })
            })
        })
    //store disconnect event
        const disconnectEvent=new Elog({type:'DISCONNECT', disconnect: new Date(), name:socket.nickname, socket:socket.id})
        disconnectEvent.save((err)=>{
            if (err) throw err;
            console.log('\n-----STORING THE EVENT INTO THE DATABASE-----\nEvent Type: '+disconnectEvent.type+'\nCreated by: ' + disconnectEvent.name + '\nFor Socket: '+disconnectEvent.socket+'\nSaved to database at: '+ disconnectEvent.disconnect)
        })
    //update the eventlog for specific socket in database
        fs.appendFile('./eventLog.txt', disconnectEvent.socket+" has been disconnected @ "+ disconnectEvent.disconnect +" and created by "+ disconnectEvent.name +"\n", {'flags': 'a'},(err)=>{
            if (err) throw err;
        })
    //let other users in the room know user has disconnected
        socket.broadcast.emit('updatechat', 'Cortana:', socket.nickname + ' has disconnected');
        socket.leave(socket.room);
        updateNicknames();
    });
})
}