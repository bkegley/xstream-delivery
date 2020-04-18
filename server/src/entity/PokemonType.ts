import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class PokemonType {
  @PrimaryColumn()
  name!: string;

  @Column()
  url!: string;

  @Column()
  slot!: number;
}
