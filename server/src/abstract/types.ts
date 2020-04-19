export const TYPES = {
  // abstract
  EntityManager: Symbol("EntityManager"),
  IOServer: Symbol("IOServer"),
  TwitchClient: Symbol("TwitchClient"),

  // commands
  CatchCommand: Symbol("CatchCommand"),
  DuelCommand: Symbol("DuelCommand"),
  ListCommand: Symbol("ListCommand"),

  // services
  PokemonService: Symbol("Pokemon"),
  UserService: Symbol("UserService"),
};
