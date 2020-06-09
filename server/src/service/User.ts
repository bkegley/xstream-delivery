import { User } from "../entity/User";
import { BaseService } from "../abstract";
import { IUserService } from "../interfaces";
import { Vehicle } from "../entity/Vehicle";

export class UserService extends BaseService implements IUserService {
  public getByUsername(username: string) {
    return this.manager
      .createQueryBuilder(User, "user")
      .where("username = :username", { username })
      .getOne();
  }

  public async addCurrency(username: string, amount: number) {
    const user = await this.getByUsername(username);
    if (user) {
      user.currency = user.currency + amount;
      this.manager.save(user);
    }
    return user;
  }

  public async spendCurrency(username: string, amount: number) {
    const user = await this.getByUsername(username);
    if (user && user.currency > amount) {
      user.currency = user.currency - amount;
      this.manager.save(user);
    }
    return user;
  }

  public async purchaseVehicle(username: string, vehicle: Vehicle) {
    const user = await this.getByUsername(username);
    if (user && user.currency >= vehicle.cost) {
      user.currency = user.currency - vehicle.cost;
      user.vehicles = user.vehicles?.concat(vehicle) ?? [vehicle];
      this.manager.save(user);
    }
    return user;
  }
}
