import { User } from "../entity/User";
import { PokemonService } from "./Pokemon";
import { BaseService } from "../abstract";
import { IUserService } from "../interfaces";

export class UserService extends BaseService implements IUserService {
  public getUserWithPokemon(id: string) {
    return this.manager
      .createQueryBuilder(User, "user")
      .leftJoinAndSelect("user.pokemon", "pokemon")
      .where("user.username = :username", { username: id })
      .getOne();
  }

  public async catchPokemon(username: string, pokemonId: number) {
    const pokemonService = new PokemonService(this.manager);
    const [user, pokemon] = await Promise.all([
      this.getUserWithPokemon(username),
      pokemonService.getById(pokemonId),
    ]);

    if (!pokemon) {
      return;
    }

    if (user && user.pokemon.indexOf(pokemon) === -1) {
      user.pokemon = user.pokemon.concat(pokemon);
      this.manager.save(user);
      return user;
    }

    const newUser = new User();
    newUser.username = username;
    newUser.pokemon = [pokemon];
    this.manager.save(newUser);
    return newUser;
  }
}
