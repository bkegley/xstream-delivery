import { ICommand } from "../interfaces";
import { IPhoneService } from "../interfaces/Phone";
import { ChatUserstate } from "tmi.js";

export class RestartCommand implements ICommand {
  private phoneService: IPhoneService;

  constructor(phoneService: IPhoneService) {
    this.phoneService = phoneService;
  }

  public async handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    console.log(`User - ${user.username} wants to restart the game!`);
    this.phoneService.init();
  }
}
