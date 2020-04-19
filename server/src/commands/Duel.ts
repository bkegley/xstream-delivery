import { Server } from "socket.io";
import { ICommand, IUserService } from "../interfaces";
import { ChatUserstate } from "tmi.js";

export class DuelCommand implements ICommand {
  private io: Server;
  private userService: IUserService;

  constructor(io: Server, userService: IUserService) {
    this.io = io;
    this.userService = userService;
  }

  public async handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    if (!user.username) {
      return;
    }

    const opponentUsername = message.split(" ")[1].toLowerCase();

    if (
      opponentUsername[0] !== "@" ||
      opponentUsername.replace("@", "") === user.username
    ) {
      return;
    }

    const [challenger, opponent] = await Promise.all([
      this.userService.getUserWithPokemon(user.username),
      this.userService.getUserWithPokemon(opponentUsername.replace("@", "")),
    ]);

    if (!challenger || !opponent) {
      return;
    }

    const challengerPokemon =
      challenger.pokemon[Math.floor(Math.random() * challenger.pokemon.length)];
    const opponentPokemon =
      opponent.pokemon[Math.floor(Math.random() * opponent.pokemon.length)];

    this.io.emit("pokemon-duel", {
      challenger: {
        user: challenger,
        pokemon: challengerPokemon,
      },
      opponent: {
        user: opponent,
        pokemon: opponentPokemon,
      },
    });

    return;
  }
}
