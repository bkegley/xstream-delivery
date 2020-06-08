import socketIo from "socket.io-client";

const socket = socketIo("http://localhost:4000");

export const useSocket = () => {
  return socket;
};
