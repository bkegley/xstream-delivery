require("dotenv").config();
import "reflect-metadata";
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
import { client, Options, Events, ChatUserstate } from "tmi.js";
import {
  createConnection,
  getConnection,
  getManager,
  EntityManager,
} from "typeorm";
import { PokemonService } from "./service/Pokemon";
import { UserService } from "./service/User";
import { User } from "./entity/User";
import { Pokemon } from "./entity/Pokemon";
import { buildContainer } from "./buildContainer";
import { TYPES } from "./types";
import { IUserService } from "./interfaces/User";
import { IPokemonService } from "./interfaces/Pokemon";

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
  const container = await buildContainer();
  const userService = container.resolve<IUserService>(TYPES.UserService);
  const pokemonService = container.resolve<IPokemonService>(
    TYPES.PokemonService
  );

  const handleCommand = async (message: string, user: ChatUserstate) => {
    const words = message.split(" ");
    const command = words[0].replace("!", "");

    switch (command) {
      case "catch": {
        if (!user.username) {
          return;
        }

        let id: number;
        try {
          id = parseInt(words[1]);
          if (isNaN(id)) {
            return;
          }
        } catch {
          return;
        }

        const newUser = await userService.catchPokemon(user.username, id);
        console.log({ newUser });

        if (!newUser) {
          return;
        }

        const newPokemon = newUser?.pokemon.find((poke: any) => poke.id === id);
        io.emit("pokemon-catch", {
          user: newUser,
          pokemon: newPokemon,
        });
        return;
      }

      case "list": {
        if (!user.username) {
          return;
        }
        const foundUser = await userService.getUserWithPokemon(user.username);

        if (!foundUser) {
          return;
        }

        console.log({ pokemon: foundUser.pokemon.map((poke) => poke.name) });

        io.emit("pokemon-list", {
          user: user.username,
          pokemon: foundUser.pokemon,
        });

        break;
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
