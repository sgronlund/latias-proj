import socketClient from "socket.io-client";

/**
 * @summary Connects a socket to the given ip
 */
const Socket = socketClient("http://192.168.1.150:8080");

export default Socket;
