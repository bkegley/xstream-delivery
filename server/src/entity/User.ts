import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  username!: string;

  @Column({
    default: 0,
  })
  currency!: number;
}
