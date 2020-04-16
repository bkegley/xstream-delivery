require("dotenv").config();
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
import { client, Options, Events } from "tmi.js";

const botOptions: Options = {
  identity: {
    username: "bkegbot",
    password: process.env.OAUTH_TOKEN,
  },
  channels: ["bjkegley"],
};

const twitchClient = client(botOptions);

interface Message {
  message: string;
  displayName?: string;
}

const handleCommand = (message: string) => {
  const words = message.split(" ");
  const command = words[0].replace("!", "");
  switch (command) {
    case "poke": {
      const id = words[1];
      io.emit("pokemon", id);
    }
  }
};

twitchClient.on("message", (channel, user, message, self) => {
  if (message[0] === "!") {
    handleCommand(message);
  }
});

twitchClient.connect();

io.on("connection", (socket: any) => {
  console.log("a user connected!");
});

http.listen("4000", () => {
  console.log("Server listening on port 4000");
});
