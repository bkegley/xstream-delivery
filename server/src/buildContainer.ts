import { Container } from "./Container";
import { EntityManager, getManager } from "typeorm";
import { PokemonService } from "./service/Pokemon";
import { UserService } from "./service/User";
import { IPokemonService } from "./interfaces/Pokemon";
import { IUserService } from "./interfaces/User";
import { TYPES } from "./types";

export async function buildContainer() {
  const container = new Container();
  const manager = await getManager();

  container.bind<EntityManager>(TYPES.EntityManager, manager);
  container.bind<IPokemonService>(
    TYPES.PokemonService,
    (resolver) => new PokemonService(resolver.resolve(TYPES.EntityManager))
  );
  container.bind<IUserService>(
    TYPES.UserService,
    (resolver) => new UserService(resolver.resolve(TYPES.EntityManager))
  );
  return container;
}
