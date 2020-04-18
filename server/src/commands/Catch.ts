import { Server } from "socket.io";
import { UserService } from "../service/User";
import { ChatUserstate } from "tmi.js";
import { ICommand } from "../interfaces/Command";

export class CatchCommand implements ICommand {
  private io: Server;
  private userService: UserService;

  constructor(io: Server, userService: UserService) {
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

    const words = message.split(" ");

    let id: number;
    try {
      id = parseInt(words[1]);
      if (isNaN(id)) {
        return;
      }
    } catch {
      return;
    }

    const newUser = await this.userService.catchPokemon(user.username, id);

    if (!newUser) {
      return;
    }

    const newPokemon = newUser?.pokemon.find((poke: any) => poke.id === id);
    this.io.emit("pokemon-catch", {
      user: newUser,
      pokemon: newPokemon,
    });
    return;
  }
}
