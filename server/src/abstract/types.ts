export const TYPES = {
  // abstract
  EntityManager: Symbol("EntityManager"),
  IOServer: Symbol("IOServer"),
  TwitchClient: Symbol("TwitchClient"),

  // commands
  AnswerCommand: Symbol("AnswerCommand"),
  GiveCommand: Symbol("GiveCommand"),
  PewCreateCommand: Symbol("PewCreateCommand"),
  PewListCommand: Symbol("PewListCommand"),
  PewPewCommand: Symbol("PewPewCommand"),
  PurchaseVehicle: Symbol("PurchaseVehicle"),
  RestartCommand: Symbol("RestartCommand"),
  StopCommand: Symbol("StopCommand"),

  // routes
  GetPews: Symbol("GetPews"),
  CreatePew: Symbol("CreatePew"),
  UpdatePew: Symbol("UpdatePew"),
  GetVehicles: Symbol("GetVehicles"),
  CreateVehicle: Symbol("CreateVehicle"),
  UpdateVehicle: Symbol("UpdateVehicle"),

  // services
  DeliverySessionService: Symbol("DeliverySessionService"),
  UserService: Symbol("UserService"),
  PewService: Symbol("PewService"),
  PhoneService: Symbol("PhoneService"),
  VehicleService: Symbol("VehicleService"),
};
