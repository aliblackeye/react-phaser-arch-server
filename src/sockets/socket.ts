// Socket.io Types
import { Server, Socket } from "socket.io";

const players = new Map();

const onConnection = (socket: Socket) => {
  // Oyuncu bağlandığında
  players.set(socket.id, {
    playerId: socket.id,
    x: Math.floor(Math.random() * (1920 * 2)),
    y: Math.floor(Math.random() * (1080 * 2)),
  });

  // Diğer oyunculara yeni oyuncuyu ekle
  socket.broadcast.emit("newPlayer", players.get(socket.id));

  // Yeni oyuncuya mevcut oyuncuları gönder
  socket.emit("currentPlayers", Array.from(players.values()));
};

const onDisconnect = async (socket: any) => {
  console.log("Player disconnected: ", socket.id);
  socket.broadcast.emit("playerLeft", socket.id);

  players.delete(socket.id);
};

const onMovement = (socket: Socket) => {
  // Diğer oyuncuların konumunu güncelle
  socket.on("playerMovement", (movementData) => {
    const player = players.get(socket.id);
    player.x = movementData.x;
    player.y = movementData.y;
    socket.broadcast.emit("playerMovement", player);
  });
};

export default (io: Server<any>) => {
  io.use(async (socket: Socket, next) => {
    next();
  });

  // Bağlantı kurulduğunda
  io.on("connection", async (socket) => {
    onConnection(socket);
    onMovement(socket);

    // Bağlantı kesildiğinde
    socket.on("disconnect", async () => {
      onDisconnect(socket);
    });
  });
};
