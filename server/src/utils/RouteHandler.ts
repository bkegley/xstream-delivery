import { Request, Response } from "express";
import { Container } from "./Container";
import { IRoute } from "../interfaces";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export class RouteHandler {
  private registry = new Map();
  private container: Container;

  constructor(container: Container) {
    this.container = container;
  }

  public registerRoute(route: string, method: Method, symbol: Symbol) {
    this.registry.set(`${method}-${route}`, symbol);
  }

  public handleRoute(req: Request, res: Response) {
    const handler = this.registry.get(`${req.method}-${req.url}`);

    if (!handler) {
      console.log(`Missing route for path ${req.url}`);
      res.status(404).send("Not found");
      return;
    }

    return this.container.resolve<IRoute>(handler).handleRoute(req, res);
  }
}
