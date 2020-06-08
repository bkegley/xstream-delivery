import { IRoute } from "../../interfaces";
import { Request, Response } from "express";
import { VehicleService } from "../../service/Vehicle";

export class GetVehicles implements IRoute {
  private vehicleService: VehicleService;

  constructor(vehicleService: VehicleService) {
    this.vehicleService = vehicleService;
  }

  async handleRoute(req: Request, res: Response) {
    const vehicles = await this.vehicleService.listVehicles();
    res.json(vehicles);
  }
}
