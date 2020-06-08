import { Server } from "socket.io";
import { ChatUserstate } from "tmi.js";
import { ICommand, IPewService } from "../interfaces";

export class PewCreateCommand implements ICommand {
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
    if (!user.username) {
      return;
    }

    const [_command, pewCommand, cost] = message.split(" ");

    const pew = await this.pewService.create({
      command: pewCommand,
      cost: parseInt(cost),
    });
    console.log({ pew });

    this.io.emit("pewcreate", pew);
  }
}
