import { Pokemon } from "../entity/Pokemon";

export interface IPokemonService {
  getById(id: number): Promise<Pokemon | undefined>;
}
