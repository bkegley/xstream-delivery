import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Ability {
  @PrimaryColumn()
  name!: string;

  @Column()
  url!: string;

  @Column()
  is_hidden!: boolean;

  @Column()
  slot!: number;
}
