import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "despesas", schema: "public" })
export class Despesa {
  @PrimaryColumn({ type: "integer", primaryKeyConstraintName: "despesas_pk" })
  id: number;

  @Column({ type: "varchar", nullable: true })
  descricao: string | null;

  // PostgreSQL retorna numeric como string para preservar a precisao.
  @Column({ type: "numeric", nullable: true })
  valor: string | null;

  @Column({ type: "varchar", nullable: true })
  mes: string | null;
}
