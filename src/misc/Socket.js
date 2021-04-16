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

Socket.on('serverPublic', (server_public,g,p) => {
      server_public = bigInt(server_public);
      g = bigInt(g);
      p = bigInt(p);
      var private_key = bigInt(1337420); //TODO generera på annat sätt
      var my_public_key = g.modPow(private_key,p);
      sharedKey = server_public.modPow(private_key,p);
      Socket.emit('clientPublic', Number(my_public_key));
    });
Socket.emit('startKeyExchange');

export default Socket;
export {sharedKey, Socket};
