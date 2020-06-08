import { Server } from "socket.io";
import { ChatUserstate } from "tmi.js";
import { ICommand, IPewService, IUserService } from "../interfaces";

export class PewPewCommand implements ICommand {
  private io: Server;
  private pewService: IPewService;
  private userService: IUserService;

  constructor(io: Server, pewService: IPewService, userService: IUserService) {
    this.io = io;
    this.pewService = pewService;
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

    const [_command, ...words] = message.split(" ");
    const pewCommand = words.join(" ");

    const [pew, foundUser] = await Promise.all([
      this.pewService.get(pewCommand),
      this.userService.getByUsername(user.username),
    ]);

    console.log({ pew, foundUser });

    if (!pew || !foundUser) {
      return null;
    }

    if (pew.cost && foundUser.currency < pew.cost) {
      console.log("You do not have enough currency");
      return null;
    }

    if (pew.cost) {
      const updatedUser = await this.userService.spendCurrency(
        foundUser.username,
        pew.cost
      );
      if (updatedUser) {
        foundUser.currency = updatedUser.currency;
      }
    }

    this.io.emit("pewpew", { user: foundUser, pew });
  }
}
