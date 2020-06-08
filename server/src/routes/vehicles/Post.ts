import { IRoute } from "../../interfaces";
import { VehicleService } from "../../service/Vehicle";
import { Request, Response } from "express";

export class CreateVehicle implements IRoute {
  private vehicleService: VehicleService;

  constructor(vehicleService: VehicleService) {
    this.vehicleService = vehicleService;
  }

  async handleRoute(req: Request, res: Response) {
    console.log({ body: req.body });
    const vehicle = await this.vehicleService.createVehicle(req.body);
    res.json(vehicle);
  }
}
