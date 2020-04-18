import { Pokemon } from "../entity/Pokemon";
import { IPokemonService } from "../interfaces/Pokemon";
import { BaseService } from "../abstract/BaseService";

export class PokemonService extends BaseService implements IPokemonService {
  public async getById(id: number) {
    return this.manager.findOne(Pokemon, id);
  }
}
