import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";
import { Vehicle } from "./Vehicle";

@Entity()
export class Pew {
  @PrimaryColumn()
  command!: string;

  @Column({
    nullable: true,
  })
  cost?: number;

  @Column({
    nullable: true,
  })
  fieldModified?: "baseHealth" | "baseSpeed";

  @Column({
    nullable: true,
  })
  modifierType?: "percent" | "value" | "changeValue";

  @Column({
    nullable: true,
  })
  duration?: number;

  @Column({
    nullable: true,
    default: "immediate",
  })
  effectType?: "immediate" | "missile";

  @Column({
    nullable: true,
  })
  description?: string;
}
