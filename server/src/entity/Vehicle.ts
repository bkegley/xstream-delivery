import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    default: false,
  })
  isDefault!: boolean;

  @Column()
  name!: string;

  @Column()
  baseSpeed!: number;

  @Column()
  baseHealth!: number;

  @Column()
  cost!: number;
}
