import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Move {
  @PrimaryColumn()
  name!: string;

  @Column()
  url!: string;

  @Column("jsonb", { array: false, default: () => "'[]'" })
  version_group_details!: Array<{
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }>;
}
