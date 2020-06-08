import { Pew } from "../entity/Pew";

export interface IPewService {
  get: (command: string) => Promise<Pew | null>;
  list: () => Promise<Array<Pew | undefined>>;
  create: (data: Pew) => Promise<Pew>;
}
