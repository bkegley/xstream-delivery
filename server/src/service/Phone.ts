import { Server } from "socket.io";
import { IDeliverySessionService } from "../interfaces";

export class PhoneService {
  private io: Server;
  private deliverySessionService: IDeliverySessionService;
  private isRinging = false;

  private ringingTimeout!: NodeJS.Timeout;
  private ringingInterval!: NodeJS.Timeout;

  constructor(io: Server, deliverySessionService: IDeliverySessionService) {
    this.io = io;
    this.deliverySessionService = deliverySessionService;
  }

  init(baseInterval: number = 8000, ringLength: number = 4000) {
    this.ringingInterval = setInterval(() => {
      this.ring();
      console.log("phone is ringing");
      this.ringingTimeout = setTimeout(() => {
        this.stopRing();
        console.log("phone is not ringing");
      }, ringLength);
    }, baseInterval);
  }

  stop() {
    if (this.ringingInterval) {
      clearInterval(this.ringingInterval);
    }
    if (this.ringingTimeout) {
      clearTimeout(this.ringingTimeout);
    }
  }

  private ring() {
    this.isRinging = true;
    this.io.emit("ringing", true);
  }

  private stopRing() {
    this.isRinging = false;
    this.io.emit("ringing", false);
  }

  async answer(username: string) {
    if (this.isRinging) {
      console.log("we are going to answer the phone!");
      clearTimeout(this.ringingTimeout);
      this.stopRing();
      this.stop();
      const deliverySession = await this.deliverySessionService.create(
        username
      );
      console.log({ deliverySession });
      return true;
    }
    return false;
  }
}
