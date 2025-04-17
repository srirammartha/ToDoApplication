import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[] | undefined;
}
