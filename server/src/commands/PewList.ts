import { Server } from "socket.io";
import { ChatUserstate } from "tmi.js";
import { ICommand, IPewService } from "../interfaces";

export class PewListCommand implements ICommand {
  private io: Server;
  private pewService: IPewService;

  constructor(io: Server, pewService: IPewService) {
    this.io = io;
    this.pewService = pewService;
  }

  public async handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    const pews = await this.pewService.list();
    console.log({ pews });
    this.io.emit("pew-list", pews);
  }
}
