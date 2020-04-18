require("dotenv").config();
import "reflect-metadata";
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
import { client, Options, Events } from "tmi.js";

/**
 * Map incoming data to entity types
 * Write a populate script that loads the db
 *
 * Write routes for responding to chat commands
 */

import { createConnection } from "typeorm";
import { Pokemon } from "./entity/Pokemon";

async function startServer() {
  const connection = await createConnection();

  const pokemon = new Pokemon();
  pokemon.id = 1;
  pokemon.name = "Golduck";
  pokemon.height = 4;

  connection.manager.save(pokemon).then((poke) => {
    console.log(JSON.stringify(poke));
  });
}

startServer();

// const botOptions: Options = {
//   identity: {
//     username: "bkegbot",
//     password: process.env.OAUTH_TOKEN,
//   },
//   channels: ["bjkegley"],
// };

// const twitchClient = client(botOptions);

// interface Message {
//   message: string;
//   displayName?: string;
// }

// const handleCommand = (message: string) => {
//   const words = message.split(" ");
//   const command = words[0].replace("!", "");
//   switch (command) {
//     case "poke": {
//       const id = words[1];
//       io.emit("pokemon", id);
//     }
//   }
// };

// twitchClient.on("message", (channel, user, message, self) => {
//   if (message[0] === "!") {
//     handleCommand(message);
//   }
// });

// twitchClient.connect();

// io.on("connection", (socket: any) => {
//   console.log("a user connected!");
// });

// http.listen("4000", () => {
//   console.log("Server listening on port 4000");
// });
