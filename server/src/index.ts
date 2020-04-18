require("dotenv").config();
import "reflect-metadata";
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
import { Server } from "socket.io";
import { client, Options, Client } from "tmi.js";
import { createConnection } from "typeorm";
import { buildContainer } from "./buildContainer";
import { TYPES } from "./types";
import { CommandHandler } from "./CommandHandler";

const botOptions: Options = {
  identity: {
    username: "bkegbot",
    password: process.env.OAUTH_TOKEN,
  },
  channels: ["bjkegley"],
};

async function startServer() {
  await createConnection();
  const twitchClient = client(botOptions);
  const container = await buildContainer();
  container.bind<Client>(TYPES.TwitchClient, twitchClient);
  container.bind<Server>(TYPES.IOServer, io);

  const commandHandler = new CommandHandler(container);
  commandHandler.registerCommand("!list", TYPES.ListCommand);
  commandHandler.registerCommand("!catch", TYPES.CatchCommand);

  // const handleCommand = async (message: string, user: ChatUserstate) => {
  //   const words = message.split(" ");
  //   const command = words[0].replace("!", "");

  //   switch (command) {
  //     case 'hunt': {

  //     }
  //
  //   }
  // };

  twitchClient.on("message", (channel, user, message, self) => {
    if (message[0] === "!") {
      commandHandler.handleCommand(channel, user, message, self);
    }
  });

  twitchClient.connect();

  io.on("connection", (socket: any) => {
    console.log("a user connected!");
  });

  http.listen("4000", () => {
    console.log("Server listening on port 4000");
  });
}

startServer();
