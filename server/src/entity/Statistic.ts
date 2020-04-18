import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Statistic {
  @PrimaryColumn()
  name!: string;

  @Column()
  url!: string;

  @Column()
  base_stat!: number;

  @Column()
  effort!: number;
}
