import { Pokemon } from "../entity/Pokemon";
import { IPokemonService } from "../interfaces";
import { BaseService } from "../abstract";

export class PokemonService extends BaseService implements IPokemonService {
  public async getById(id: number) {
    return this.manager.findOne(Pokemon, id);
  }
}
