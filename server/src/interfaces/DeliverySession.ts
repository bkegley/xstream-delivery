import { DeliverySession } from "../entity/DeliverySession";

export interface IDeliverySessionService {
  create(username: string): Promise<DeliverySession | undefined>;
}
