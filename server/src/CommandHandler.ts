import { ChatUserstate } from "tmi.js";
import { IResolver } from "./Container";
import { ICommand } from "./interfaces/Command";

export class CommandHandler {
  private registry = new Map();
  private container: IResolver;

  constructor(container: IResolver) {
    this.container = container;
  }

  public registerCommand(command: string, symbol: Symbol) {
    this.registry.set(command, symbol);
  }

  public handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    const command = message.split(" ")[0];
    const handler = this.registry.get(command);
    if (!handler) {
      console.log(`${command} not found in registry`);
      return;
    }

    return this.container
      .resolve<ICommand>(handler)
      .handleCommand(channel, user, message, self);
  }
}
