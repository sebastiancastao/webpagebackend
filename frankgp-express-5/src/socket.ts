// src/socket.ts
import { createServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import app from "./app";

const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.info("🟢 Nuevo cliente conectado:", socket.id);

  const emitConnectedUsers = () => {
    const connectedUsers = Array.from(io.sockets.sockets.keys());
    // console.info("👥 🔌 Usuarios conectados:", connectedUsers.length, new Date().toLocaleString("us-CO"));
    console.info("👥 Usuarios conectados:", connectedUsers.length, new Date());
    io.emit("connectedUsers", connectedUsers);
  };

  // 👋 Emitir al conectar
  emitConnectedUsers();

  // 🔄 Emitir manualmente cuando un cliente lo solicita
  socket.on("getConnectedUsers", () => {
    console.info("📥 Solicitud de usuarios conectados desde:", socket.id);
    emitConnectedUsers();
  });

  // 🔌 Emitir cuando un cliente se desconecta
  socket.on("disconnect", () => {
    console.info("🔴 Cliente desconectado:", socket.id);
    emitConnectedUsers();
  });
});

export { httpServer };
