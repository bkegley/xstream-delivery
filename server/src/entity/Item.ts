import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Item {
  @PrimaryColumn()
  name!: string;

  @Column()
  url!: string;

  @Column("jsonb", { array: false, default: () => "'[]'" })
  version_details!: Array<{
    rarity: number;
    version: {
      name: string;
      url: string;
    };
  }>;
}
