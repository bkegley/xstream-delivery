require("dotenv").config();
import "reflect-metadata";
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
import { client, Options, Events, ChatUserstate } from "tmi.js";
import { createConnection, getConnection, getManager } from "typeorm";
import { User } from "./entity/User";
import { Pokemon } from "./entity/Pokemon";

const botOptions: Options = {
  identity: {
    username: "bkegbot",
    password: process.env.OAUTH_TOKEN,
  },
  channels: ["bjkegley"],
};

interface Message {
  message: string;
  displayName?: string;
}

async function startServer() {
  await createConnection();

  const twitchClient = client(botOptions);

  const handleCommand = async (message: string, user: ChatUserstate) => {
    const words = message.split(" ");
    const command = words[0].replace("!", "");
    switch (command) {
      case "poke": {
        const id = words[1];
        io.emit("pokemon", id);
      }
      case "catch": {
        if (!user.username) {
          return;
        }

        let id;
        try {
          id = parseInt(words[1]);
          if (isNaN(id)) {
            return;
          }
        } catch {
          return;
        }

        const manager = await getManager();
        const [foundUser, foundPokemon] = await Promise.all([
          manager
            .createQueryBuilder(User, "user")
            .leftJoinAndSelect("user.pokemon", "pokemon")
            .where("user.username = :username", { username: user.username })
            .getOne(),
          manager.findOne(Pokemon, id),
        ]);

        if (!foundPokemon) {
          return;
        }

        if (foundUser && foundUser.pokemon.indexOf(foundPokemon) === -1) {
          foundUser.pokemon = foundUser.pokemon.concat(foundPokemon);
          manager.save(foundUser);
          return;
        }

        const newUser = new User();
        newUser.username = user.username;
        newUser.pokemon = [foundPokemon];
        manager.save(newUser);
        return;
      }

      case "list": {
        if (!user.username) {
          return;
        }
        const foundUser = await getManager()
          .createQueryBuilder(User, "user")
          .leftJoinAndSelect("user.pokemon", "pokemon")
          .where("user.username = :username", { username: user.username })
          .getOne();

        if (!foundUser) {
          return;
        }

        io.emit("pokemon-list", {
          user: user.username,
          pokemon: foundUser.pokemon,
        });
      }
    }
  };

  twitchClient.on("message", (channel, user, message, self) => {
    if (message[0] === "!") {
      handleCommand(message, user);
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
