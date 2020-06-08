import { IRoute } from "../../interfaces";
import { Request, Response } from "express";
import { PewService } from "../../service/Pew";

export class GetPews implements IRoute {
  private pewService: PewService;

  constructor(pewService: PewService) {
    this.pewService = pewService;
  }

  async handleRoute(req: Request, res: Response) {
    const pews = await this.pewService.list();
    console.log({ pews });
    res.json(pews);
  }
}
