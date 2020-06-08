import { Server } from "socket.io";
import { ChatUserstate } from "tmi.js";
import { ICommand, IDeliverySessionService } from "../interfaces";
import { IPhoneService } from "../interfaces/Phone";

export class AnswerCommand implements ICommand {
  private io: Server;
  private deliverySessionService: IDeliverySessionService;
  private phoneService: IPhoneService;

  constructor(
    io: Server,
    deliveryService: IDeliverySessionService,
    phoneService: IPhoneService
  ) {
    this.io = io;
    this.deliverySessionService = deliveryService;
    this.phoneService = phoneService;
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

    const answered = this.phoneService.answer(user.username);
    console.log(`${user.username} answered the phone - ${answered}`);
    return null;
    // const deliverySession = await this.deliverySessionService.answer(
    //   user.username
    // );
    // return deliverySession;
  }
}
