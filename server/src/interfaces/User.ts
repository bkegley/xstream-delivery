import { User } from "../entity/User";

export interface IUserService {
  getByUsername: (username: string) => Promise<User | undefined>;
  addCurrency: (username: string, amount: number) => Promise<User | undefined>;
  spendCurrency: (
    username: string,
    amount: number
  ) => Promise<User | undefined>;
}
