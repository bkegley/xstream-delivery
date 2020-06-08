import { Server } from "socket.io";
import { ChatUserstate } from "tmi.js";
import { ICommand, IDeliverySessionService, IUserService } from "../interfaces";

export class GiveCommand implements ICommand {
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

    const [_command, username, amount] = message.split(" ");
    if (!username || !amount || isNaN(parseInt(amount, 10))) {
      return null;
    }

    const foundUser = await this.userService.addCurrency(
      username.replace("@", "").toLowerCase(),
      parseInt(amount, 10)
    );
  }
}
