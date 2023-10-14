import { io } from "socket.io-client";
const socket = io(useRuntimeConfig().public.socketURI);

export default socket;