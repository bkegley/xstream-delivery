import { IRoute } from "../../interfaces";
import { PewService } from "../../service/Pew";
import { Request, Response } from "express";

export class CreatePew implements IRoute {
  private pewService: PewService;

  constructor(pewService: PewService) {
    this.pewService = pewService;
  }

  async handleRoute(req: Request, res: Response) {
    console.log({ body: req.body });
    const pew = await this.pewService.create(req.body);
    return res.json(pew);
  }
}
