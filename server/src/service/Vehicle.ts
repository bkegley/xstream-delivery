import { BaseService } from "../abstract";
import { IVehicleService } from "../interfaces/Vehicle";
import { Vehicle } from "../entity/Vehicle";

export class VehicleService extends BaseService implements IVehicleService {
  listVehicles() {
    return this.manager.createQueryBuilder(Vehicle, "vehicles").getMany();
  }

  async createVehicle(data: Vehicle) {
    const vehicle = new Vehicle();
    // @ts-ignore
    Object.keys(data).forEach((key) => (vehicle[key] = data[key]));

    await this.manager.save(vehicle);

    return vehicle;
  }
}
