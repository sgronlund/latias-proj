import socketClient from "socket.io-client";

const Socket = socketClient("http://localhost:8080");

export default Socket;
