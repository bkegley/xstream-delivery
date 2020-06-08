import { Vehicle } from "../entity/Vehicle";

export interface IVehicleService {
  listVehicles: () => Promise<Array<Vehicle | undefined>>;
  //   getVehicle: (id: number) => Vehicle | undefined;
  //   createVehicle: (data: Vehicle) => Vehicle;
  //   updateVehicle: (id: number, data: Vehicle) => Vehicle;
}
