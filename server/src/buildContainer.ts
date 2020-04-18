import { Container } from "./Container";
import { EntityManager, getManager } from "typeorm";
import { PokemonService } from "./service/Pokemon";
import { UserService } from "./service/User";
import { ICommand } from "./interfaces/Command";
import { IPokemonService } from "./interfaces/Pokemon";
import { IUserService } from "./interfaces/User";
import { TYPES } from "./types";
import { CatchCommand } from "./commands/Catch";
import { ListCommand } from "./commands/List";

export async function buildContainer() {
  const container = new Container();
  const manager = await getManager();

  // abstract bindings
  container.bind<EntityManager>(TYPES.EntityManager, manager);

  // command bindings
  container.bind<ICommand>(
    TYPES.ListCommand,
    (resolver) =>
      new ListCommand(
        resolver.resolve(TYPES.IOServer),
        resolver.resolve(TYPES.UserService)
      )
  );
  container.bind<ICommand>(
    TYPES.CatchCommand,
    (resolver) =>
      new CatchCommand(
        resolver.resolve(TYPES.IOServer),
        resolver.resolve(TYPES.UserService)
      )
  );

  // service bindings
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
