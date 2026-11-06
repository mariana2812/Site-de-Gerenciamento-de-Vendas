import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "usuario", schema: "public" })
export class User {
  @PrimaryGeneratedColumn("identity", { type: "integer", primaryKeyConstraintName: "usuario_pk" })
  id: number;

  @Column({ type: "varchar", nullable: true })
  nome: string | null;

  @Column({ type: "varchar", nullable: true })
  email: string | null;

  @Column({ type: "varchar", nullable: true })
  senha: string | null;

  @Column({ type: "varchar", nullable: true })
  nomeloja: string | null;
}
