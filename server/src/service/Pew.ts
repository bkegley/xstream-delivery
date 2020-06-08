import { BaseService } from "../abstract";
import { IPewService } from "../interfaces";
import { Pew } from "../entity/Pew";

export class PewService extends BaseService implements IPewService {
  async get(command: string) {
    const pew = await this.manager
      .createQueryBuilder(Pew, "pew")
      .where("command = :command", { command })
      .getOne();
    if (pew) {
      return pew;
    }
    return null;
  }

  async list() {
    return this.manager.createQueryBuilder(Pew, "pew").getMany();
  }

  async create(data: Pew) {
    const pew = new Pew();
    // @ts-ignore
    Object.keys(data).forEach((key) => (pew[key] = data[key]));
    await this.manager.save(pew);

    return pew;
  }

  async update(id: number, pew: Pew) {
    return this.manager
      .createQueryBuilder()
      .update(Pew)
      .set(pew)
      .where("id = :id", { id })
      .execute();
  }
}
