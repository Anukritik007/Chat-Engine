
let app= require('express')();
let http = require('http').Server(app);
let io =require('socket.io')(http);

let numberOfOnlineUsers=0;
let online=[];
let isInfo=false;

io.on('connection', (socket)=>
{
    console.log('new connection made.');
    
    // socket.on("disconnect", function()  //if user closes the tab or page refresh
    // {
    //     console.log("one user disconnected");

    //     numberOfOnlineUsers--;
    //     io.emit('number of online users',numberOfOnlineUsers);
    //   });

    socket.on('join', function(data){
        socket.join(data.room);
        //console.log(data);
        console.log(data.user +' joined the room: ' + data.room);

        socket.broadcast.to(data.room).emit('new user joined' , {user:data.user , reply:' joined the chat.',isInfo:true});

        numberOfOnlineUsers++;
        io.emit('number of online users',numberOfOnlineUsers);

        online.push(data.user);
        console.log('list of online users');
        console.log(online);
        io.emit('online users',online);

    });

    socket.on('leave', function(data){
        console.log(data.user +' left the room:' + data.room);
        socket.broadcast.to(data.room).emit('left room' ,{user:data.user, reply:' left the chat.',isInfo:true});

        socket.leave(data.room);

        numberOfOnlineUsers--;
        io.emit('number of online users',numberOfOnlineUsers);

        var index = online.indexOf(data.user);
        console.log('index of logged out user: '+ index);
        if (index > -1) {
            online.splice(index, 1);
          }
        
        console.log('list of online users');
        console.log(online);
        io.emit('online users',online);
    });

    socket.on('message', function(data){
        io.in(data.room).emit('new message' ,{user:data.user , reply:data.reply ,time:data.time, isInfo:false});
    })
});

http.listen(5000, ()=>{
    console.log('started on port 5000');
});

