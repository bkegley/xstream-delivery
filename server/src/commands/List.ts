import { ChatUserstate } from "tmi.js";
import { Server } from "socket.io";
import { IUserService } from "../interfaces/User";
import { ICommand } from "../interfaces/Command";

export class ListCommand implements ICommand {
  private io: Server;
  private userService: IUserService;

  constructor(io: Server, userService: IUserService) {
    this.userService = userService;
    this.io = io;
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
    const foundUser = await this.userService.getUserWithPokemon(user.username);

    if (!foundUser) {
      return;
    }

    console.log({ pokemon: foundUser.pokemon.map((poke) => poke.name) });

    this.io.emit("pokemon-list", {
      user: user.username,
      pokemon: foundUser.pokemon,
    });
  }
}
