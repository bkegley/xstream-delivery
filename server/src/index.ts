require("dotenv").config();
import "reflect-metadata";
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "socket.io";
import { client, Options, Client } from "tmi.js";
import { createConnection } from "typeorm";
import { buildContainer } from "./utils/buildContainer";
import { TYPES } from "./abstract";
import { CommandHandler } from "./utils/CommandHandler";
import { IPhoneService } from "./interfaces/Phone";
import { PhoneService } from "./service";
import { RouteHandler } from "./utils/RouteHandler";
import { Request, Response } from "express";

const botOptions: Options = {
  identity: {
    username: "bkegbot",
    password: process.env.OAUTH_TOKEN,
  },
  channels: ["bjkegley"],
};

async function startServer() {
  await createConnection();
  const twitchClient = client(botOptions);
  const container = await buildContainer();
  container.bind<Client>(TYPES.TwitchClient, twitchClient);
  container.bind<Server>(TYPES.IOServer, io);

  container.bind<IPhoneService>(
    TYPES.PhoneService,
    new PhoneService(
      container.resolve(TYPES.IOServer),
      container.resolve(TYPES.DeliverySessionService)
    )
  );

  const commandHandler = new CommandHandler(container);
  commandHandler.registerCommand("!answer", TYPES.AnswerCommand);
  commandHandler.registerCommand("!give", TYPES.GiveCommand);
  commandHandler.registerCommand("!pewlist", TYPES.PewListCommand);
  commandHandler.registerCommand("!pewcreate", TYPES.PewCreateCommand);
  commandHandler.registerCommand("!pewpew", TYPES.PewPewCommand);
  commandHandler.registerCommand("!purchase", TYPES.PurchaseVehicle);
  commandHandler.registerCommand("!restart", TYPES.RestartCommand);
  commandHandler.registerCommand("!stop", TYPES.StopCommand);

  app.use(bodyParser.json());
  app.use(cors());

  const routeHandler = new RouteHandler(container);
  routeHandler.registerRoute("/pews", "GET", TYPES.GetPews);
  routeHandler.registerRoute("/pews", "POST", TYPES.CreatePew);
  routeHandler.registerRoute("/pews", "PUT", TYPES.UpdatePew);
  routeHandler.registerRoute("/vehicles", "GET", TYPES.GetVehicles);
  routeHandler.registerRoute("/vehicles", "POST", TYPES.CreateVehicle);
  routeHandler.registerRoute("/vehicles", "PUT", TYPES.UpdateVehicle);

  app.use((req: Request, res: Response) => {
    return routeHandler.handleRoute(req, res);
  });

  twitchClient.on("message", (channel, user, message, self) => {
    if (message[0] === "!") {
      commandHandler.handleCommand(channel, user, message, self);
    }
  });

  const phoneService = container.resolve<IPhoneService>(TYPES.PhoneService);
  phoneService.init();

  twitchClient.connect();

  io.on("connection", (socket: any) => {
    console.log("a user connected!");
  });

  http.listen("4000", () => {
    console.log("Server listening on port 4000");
  });
}

startServer();
