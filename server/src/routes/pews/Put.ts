import { IRoute } from "../../interfaces";
import { PewService } from "../../service/Pew";
import { Request, Response } from "express";

export class UpdatePew implements IRoute {
  private pewService: PewService;

  constructor(pewService: PewService) {
    this.pewService = pewService;
  }

  async handleRoute(req: Request, res: Response) {
    const { id, ...updateColumns } = req.body;
    const pew = await this.pewService.update(id, updateColumns);
    console.log({ pew });
    return res.json(pew);
  }
}
