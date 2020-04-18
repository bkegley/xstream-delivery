import { User } from "../entity/User";

export interface IUserService {
  getUserWithPokemon(username: string): Promise<User | undefined>;
  catchPokemon(username: string, pokemonId: number): Promise<User | undefined>;
}
