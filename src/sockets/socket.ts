// Socket.io Types
import { Server, Socket } from "socket.io";

const players = new Map();

const onConnection = (socket: Socket) => {
  // console.log("Player connected: ", socket.id);
};

const onDisconnect = async (socket: any) => {
  const player = players.get(socket.id);
  if (!player) return;
  console.log("Player left: ", player?.name);
  socket.broadcast.emit("playerLeft", socket.id);

  players.delete(socket.id);
};

const onPlayerJoined = (socket: Socket) => {
  socket.on("joinGame", async (name) => {
    console.log("Player joined: ", name);
    // Oyuncu bağlandığında
    players.set(socket.id, {
      name,
      id: socket.id,
      x: Math.floor(Math.random() * (1920 * 2)),
      y: Math.floor(Math.random() * (1080 * 2)),
      ip: socket.handshake.address,
    });

    // Diğer oyunculara yeni oyuncuyu ekle
    socket.broadcast.emit("newPlayer", players.get(socket.id));
    socket.emit("test", "test");
    // Yeni oyuncuya mevcut oyuncuları gönder
    socket.emit("currentPlayers", Array.from(players.values()));
  });
};

const onPlayerMovement = (socket: Socket) => {
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
    onPlayerJoined(socket);
    onPlayerMovement(socket);

    // Bağlantı kesildiğinde
    socket.on("disconnect", async () => {
      onDisconnect(socket);
    });
  });
};
