// Global variables
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// Initialize variables
var userID = 0;
var nicknames = [];
var chatLog = [];
var users = {};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// Listens for connection
io.on('connection', function(socket){
  displayChatLog(socket);
  userID++;
  // Assign default username
  var defaultName = 'user' + userID;
  io.emit('system message', defaultName + ' has connected.');
  socket.nickname = defaultName;
  var ID = generateClientID();
  // Create user object
  var client = {"ID": ID};
  users[client.ID] = { 
    "color": '00000', // default nickname color to black
    "nickname": defaultName
  }

  for (var key in users) {
    console.log(key);
    console.log(users[key])

  }

  // Update array of nicknames
  nicknames.push(socket.nickname);
  nicknames.sort();

  // Update client
  socket.emit('update username', socket.nickname);
  io.emit('users', nicknames);

  socket.on('generate ID', function(bool){
    socket.emit('store cookie', setClientID())
  });

  // Listens for new chat message
  socket.on('chat message', function(msg){
    // Determine if user wants to change nickname
    if (msg.substring(0, 6) === '/nick ') {
      verifyAndSetUsername(socket, msg);
      socket.emit('system message', 'Nickname changed!');
    } else if (msg.substring(0, 10) === '/nickcolor') { // Check if user wants to update nickname colour
      var color = msg.substring(11, 18); // get color
      console.log(color);
        if (/[0-9A-F]{6}$/i.test(color)) { // valid color
          console.log('Valid color');
          updateNickColor(client, color);
          socket.emit('system message', 'Nickname color updated!');
        } else { // invalid color
          socket.emit('error message', 'You entered ' + color + '. Please a valid hexadecimal value (xxxxxx where x is a value between 0-9 or a-f)');
        }

    } else { // broadcast chat message to all users
        var d = new Date();
        var timestamp = d.toTimeString().substring(0,5);
        var color = users[client.ID].color;
        var message = timestamp + ' ' + socket.nickname + ': ' + msg;
        chatLog.push(message);
        console.log(chatLog);
        io.emit('chat message', timestamp, socket.nickname, color, msg);
         }});

  // Listens for disconnect
  socket.on('disconnect', function(){
    console.log(socket.nickname + ' has disconnected');
    removeFromNicknameArray(socket);
    io.emit('system message', socket.nickname + ' has disconnected.');
    io.emit('users', nicknames);
  });
});

function retrieveUsername(){
  for (var i=0; i < users.length; i++) {
    console.log("user id" + i + users[i].id);
/*  if (users[i].id === socket.nickname) {
      nicknames.splice(i, 1);
  }*/
}

}
function updateNickColor(client, color){
  users[client.ID] = { 
    "color": color
  }
}

function displayChatLog(socket){
  if(chatLog.length > 0){
    console.log(chatLog.length + ' CHAT LOG LENGTH');
    socket.emit('display log', chatLog);
  }
}

function removeFromNicknameArray(socket){
    // Remove current nickname from username list
  for (var i=nicknames.length-1; i >= 0; i--) {
    if (nicknames[i] === socket.nickname) {
        nicknames.splice(i, 1);
    }
  }        
}

function generateClientID(){
  var clientID = Math.floor((Math.random() * 2000) + 1);
  //console.log(clientID);
  return clientID;
}

function verifyAndSetUsername(socket, msg){
      // Format username
      var name = msg.substring(5, msg.length);
      var name = name.trim();

      console.log(name);
      console.log(nicknames);

      if (nicknames.indexOf(name) != -1){ // true if nickname not unique
        console.log("username taken");
        var error = '"' + name + '"' + ' is already taken! Please try a different name.';
        socket.emit('error message', error);
      } else { // nickname is unique
        removeFromNicknameArray(socket);

        console.log('changing username');

        socket.nickname = name;
        nicknames.push(socket.nickname);
        nicknames.sort();

        console.log(nicknames);

        // Notify client
        io.emit('change username', nicknames);
        socket.emit('update username', socket.nickname); 
        io.emit('users', nicknames);
      }
  }

http.listen(3000, function(){
  console.log('listening on *:3000');
});
