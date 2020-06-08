import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "./User";

@Entity()
export class DeliverySession {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    default: 5,
  })
  difficulty?: number;

  @Column({
    default: 50,
  })
  tipValue?: number;

  @Column({
    default: false,
  })
  completed!: boolean;

  @Column({
    default: false,
  })
  success!: boolean;

  @ManyToOne((type) => User, (user) => user.username)
  user!: User;
}
