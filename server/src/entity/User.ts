import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Vehicle } from "./Vehicle";

@Entity()
export class User {
  @PrimaryColumn()
  username!: string;

  @Column({
    default: 0,
  })
  currency!: number;

  @ManyToMany((type) => Vehicle)
  @JoinTable()
  vehicles?: Array<Vehicle>;
}
