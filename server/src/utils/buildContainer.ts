import { Container } from "./Container";
import { EntityManager, getManager } from "typeorm";
import { DeliverySessionService, UserService, PhoneService } from "../service";
import {
  ICommand,
  IDeliverySessionService,
  IUserService,
  IPewService,
  IRoute,
} from "../interfaces";
import { TYPES } from "../abstract";
import {
  AnswerCommand,
  PewCreateCommand,
  GiveCommand,
  PewListCommand,
  RestartCommand,
} from "../commands";
import { StopCommand } from "../commands/Stop";
import { PewPewCommand } from "../commands/PewPew";
import { PewService } from "../service/Pew";
import { GetPews } from "../routes/pews/Get";
import { CreatePew } from "../routes/pews/Post";
import { UpdatePew } from "../routes/pews/Put";
import { GetVehicles } from "../routes/vehicles/Get";
import { CreateVehicle } from "../routes/vehicles/Post";
import { IVehicleService } from "../interfaces/Vehicle";
import { VehicleService } from "../service/Vehicle";
import { PurchaseVehicleCommand } from "../commands/PurchaseVehicle";

export async function buildContainer() {
  const container = new Container();
  const manager = await getManager();

  // abstract bindings
  container.bind<EntityManager>(TYPES.EntityManager, manager);

  // command bindings
  container.bind<ICommand>(
    TYPES.AnswerCommand,
    (resolver) =>
      new AnswerCommand(
        resolver.resolve(TYPES.IOServer),
        resolver.resolve(TYPES.DeliverySessionService),
        resolver.resolve(TYPES.PhoneService)
      )
  );

  container.bind<ICommand>(
    TYPES.GiveCommand,
    (resolver) =>
      new GiveCommand(
        resolver.resolve(TYPES.IOServer),
        resolver.resolve(TYPES.UserService)
      )
  );

  container.bind<ICommand>(
    TYPES.RestartCommand,
    (resolver) => new RestartCommand(resolver.resolve(TYPES.PhoneService))
  );

  container.bind<ICommand>(
    TYPES.StopCommand,
    (resolver) =>
      new StopCommand(
        resolver.resolve(TYPES.IOServer),
        resolver.resolve(TYPES.PhoneService)
      )
  );

  container.bind<ICommand>(
    TYPES.PewListCommand,
    (resolver) =>
      new PewListCommand(
        resolver.resolve(TYPES.IOServer),
        resolver.resolve(TYPES.PewService)
      )
  );

  container.bind<ICommand>(
    TYPES.PewPewCommand,
    (resolver) =>
      new PewPewCommand(
        resolver.resolve(TYPES.IOServer),
        resolver.resolve(TYPES.PewService),
        resolver.resolve(TYPES.UserService)
      )
  );

  container.bind<ICommand>(
    TYPES.PewCreateCommand,
    (resolver) =>
      new PewCreateCommand(
        resolver.resolve(TYPES.IOServer),
        resolver.resolve(TYPES.PewService)
      )
  );

  container.bind<ICommand>(
    TYPES.PurchaseVehicle,
    (resolver) =>
      new PurchaseVehicleCommand(
        resolver.resolve(TYPES.UserService),
        resolver.resolve(TYPES.VehicleService)
      )
  );

  // route bindings
  container.bind<IRoute>(
    TYPES.GetPews,
    (resolver) => new GetPews(resolver.resolve(TYPES.PewService))
  );

  container.bind<IRoute>(
    TYPES.CreatePew,
    (resolver) => new CreatePew(resolver.resolve(TYPES.PewService))
  );

  container.bind<IRoute>(
    TYPES.UpdatePew,
    (resolver) => new UpdatePew(resolver.resolve(TYPES.PewService))
  );

  container.bind<IRoute>(
    TYPES.GetVehicles,
    (resolver) => new GetVehicles(resolver.resolve(TYPES.VehicleService))
  );

  container.bind<IRoute>(
    TYPES.CreateVehicle,
    (resolver) => new CreateVehicle(resolver.resolve(TYPES.VehicleService))
  );

  // service bindings
  container.bind<IDeliverySessionService>(
    TYPES.DeliverySessionService,
    (resolver) =>
      new DeliverySessionService(
        resolver.resolve(TYPES.EntityManager),
        resolver.resolve(TYPES.IOServer)
      )
  );

  container.bind<IUserService>(
    TYPES.UserService,
    (resolver) => new UserService(resolver.resolve(TYPES.EntityManager))
  );

  container.bind<IPewService>(
    TYPES.PewService,
    (resolver) => new PewService(resolver.resolve(TYPES.EntityManager))
  );

  container.bind<IVehicleService>(
    TYPES.VehicleService,
    (resolver) => new VehicleService(resolver.resolve(TYPES.EntityManager))
  );

  return container;
}
