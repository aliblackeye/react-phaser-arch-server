import mongoose from "mongoose";

const ExampleSchema = new mongoose.Schema({
  lobbyName: {
    type: String,
    required: true,
    unique: true,
  },
  lobbyCode: {
    type: String,
  },
  players: {
    type: [
      {
        playerId: {
          type: String,
          required: true,
        },
        displayName: {
          type: String,
          required: true,
        },
        isHost: {
          type: Boolean,
          required: true,
        },
        isReady: {
          type: Boolean,
          required: true,
          default: false,
        },
        color: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
});


export const ExampleModel =
  mongoose.model("Example", ExampleSchema) || mongoose.models.Example;