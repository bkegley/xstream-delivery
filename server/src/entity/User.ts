import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from "typeorm";
import { Pokemon } from "./Pokemon";

@Entity()
export class User {
  @PrimaryColumn()
  username!: string;

  @ManyToMany((type) => Pokemon, { cascade: true })
  @JoinTable()
  pokemon!: Pokemon[];
}
