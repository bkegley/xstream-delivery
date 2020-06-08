import { BaseService } from "../abstract";
import { DeliverySession } from "../entity/DeliverySession";
import { User } from "../entity/User";
import { IDeliverySessionService } from "../interfaces";
import { Server } from "socket.io";
import { EntityManager } from "typeorm";

export class DeliverySessionService extends BaseService
  implements IDeliverySessionService {
  private io: Server;

  constructor(manager: EntityManager, io: Server) {
    super(manager);
    this.io = io;
  }

  public async create(username: string) {
    let user = await this.manager
      .createQueryBuilder(User, "user")
      .where("username = :username", { username })
      .getOne();

    if (!user) {
      user = new User();
      user.username = username;
      await this.manager.save(user);
    }

    const deliverySession = new DeliverySession();
    deliverySession.user = user;
    this.manager.save(deliverySession);
    this.io.emit("delivery-session-created", deliverySession);
    return deliverySession;
  }
}
