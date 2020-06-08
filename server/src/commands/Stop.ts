import { ICommand } from "../interfaces";
import { Server } from "socket.io";
import { IPhoneService } from "../interfaces/Phone";
import { ChatUserstate } from "tmi.js";

export class StopCommand implements ICommand {
  private io: Server;
  private phoneService: IPhoneService;

  constructor(io: Server, phoneService: IPhoneService) {
    this.io = io;
    this.phoneService = phoneService;
  }

  public async handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    console.log(`User - ${user.username} wants to stop the game!`);
    this.phoneService.stop();
  }
}
