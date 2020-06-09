import { ICommand } from "../interfaces";
import { UserService } from "../service";
import { VehicleService } from "../service/Vehicle";
import { ChatUserstate } from "tmi.js";

export class PurchaseVehicleCommand implements ICommand {
  private userService: UserService;
  private vehicleService: VehicleService;

  constructor(userServer: UserService, vehicleService: VehicleService) {
    this.userService = userServer;
    this.vehicleService = vehicleService;
  }

  async handleCommand(
    channel: string,
    user: ChatUserstate,
    message: string,
    self: boolean
  ) {
    if (!user.username) return;

    const [_command, vehicle] = message.split(" ");

    const foundVehicle = await this.vehicleService.getVehicleByName(vehicle);
    console.log({ foundVehicle });
    if (!foundVehicle) return;
    const foundUser = await this.userService.purchaseVehicle(
      user.username,
      foundVehicle
    );
  }
}
