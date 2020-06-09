import { User } from "../entity/User";
import { Vehicle } from "../entity/Vehicle";

export interface IUserService {
  getByUsername: (username: string) => Promise<User | undefined>;
  addCurrency: (username: string, amount: number) => Promise<User | undefined>;
  spendCurrency: (
    username: string,
    amount: number
  ) => Promise<User | undefined>;
  purchaseVehicle: (
    username: string,
    vehicle: Vehicle
  ) => Promise<User | undefined>;
}
