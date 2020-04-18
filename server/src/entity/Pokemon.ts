import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from "typeorm";
import { Ability } from "./Ability";
import { GameIndex } from "./GameIndex";
import { Item } from "./Item";
import { Move } from "./Move";
import { PokemonType } from "./PokemonType";
import { Statistic } from "./Statistic";

@Entity()
export class Pokemon {
  @ManyToMany((type) => Ability, { cascade: true })
  @JoinTable()
  abilities!: Ability[];

  @Column({ nullable: true })
  base_experience!: number;

  @Column("jsonb", { array: false, default: () => "'[]'", nullable: true })
  forms!: Array<{
    name: string;
    url: string;
  }>;

  @ManyToMany((type) => GameIndex, { cascade: true })
  @JoinTable()
  game_indices!: GameIndex[];

  @Column({ nullable: true })
  height!: number;

  @ManyToMany((type) => Item, { cascade: true })
  @JoinTable()
  held_items!: Item[];

  @PrimaryColumn()
  id!: number;

  @Column({ default: false })
  is_default!: boolean;

  @Column({ nullable: true })
  location_area_encounters!: string;

  @ManyToMany((type) => Move, { cascade: true })
  @JoinTable()
  moves!: Move[];

  @Column()
  name!: string;

  @Column({ nullable: true })
  order!: number;

  @Column("jsonb", { nullable: true })
  species!: {
    name: string;
    url: string;
  };

  @Column("jsonb", { nullable: true })
  sprites!: { [x: string]: string };

  @ManyToMany((type) => Statistic, { cascade: true })
  @JoinTable()
  stats!: Statistic[];

  @ManyToMany((type) => PokemonType, { cascade: true })
  @JoinTable()
  types!: PokemonType[];

  @Column({ nullable: true })
  weight!: number;
}
