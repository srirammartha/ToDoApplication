import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title: string | undefined;

  @Column({ type: "text", nullable: true })
  description: string | undefined;

  @Column({ type: "enum", enum: ["pending", "completed"], default: "pending" })
  status: "pending" | "completed" | undefined;

  @ManyToOne(() => User, (user) => user.todos)
  user: User = new User();
}
