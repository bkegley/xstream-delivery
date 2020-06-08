import { Request, Response } from "express";

export interface IRoute {
  handleRoute(req: Request, res: Response): void;
}
