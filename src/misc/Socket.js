import socketClient from "socket.io-client";

/**
 * @summary Connects a socket to the given ip
 */
const Socket = socketClient("http://localhost:8080");

export default Socket;
