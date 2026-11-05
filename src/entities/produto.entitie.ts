import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "produto", schema: "public" })
export class Produto {
  @PrimaryColumn({ type: "integer", primaryKeyConstraintName: "produto_pk" })
  id: number;

  @Column({ type: "varchar", nullable: true })
  nome: string | null;

  // PostgreSQL retorna numeric como string para preservar a precisao.
  @Column({ type: "numeric" })
  preco: string;

  @Column({ type: "numeric" })
  custo: string;

  @Column({ type: "boolean", nullable: true })
  ativo: boolean | null;

  @Column({ name: "criado em", type: "time", nullable: true })
  criadoEm: string | null;
}
