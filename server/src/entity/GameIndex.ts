import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class GameIndex {
  @PrimaryColumn()
  name!: string;

  @Column()
  url!: string;

  @Column()
  game_index!: number;
}
