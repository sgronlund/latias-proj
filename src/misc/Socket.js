import socketClient from "socket.io-client";
import bigInt from "big-integer";

/**
 * @summary Connects a socket to the given ip
 */
const Socket = socketClient("http://localhost:8080");

/**
 * @summary the shared symmetric key to exchange data with the server
 */
let sharedKey;

Socket.on('server-public', (server_public,g,p) => {
      server_public = bigInt(server_public);
      g = bigInt(g);
      p = bigInt(p);
      console.log(g);
      var private_key = bigInt(1337420); //TODO generera på annat sätt
      var my_public_key = g.modPow(private_key,p);
      sharedKey = server_public.modPow(private_key,p);

      if(sharedKey == undefined) {
          sharedKey.wtfsyntaxkek();
      }

      console.log(sharedKey + " yes it worked wowowoowowowoow");

      Socket.emit('client-public', Number(my_public_key));
    });
Socket.emit('start-key-exchange');

export default Socket;
export {sharedKey, Socket};
