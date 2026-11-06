import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "venda", schema: "public" })
export class Venda {
  @PrimaryGeneratedColumn("identity", { type: "integer", primaryKeyConstraintName: "venda_pk" })
  id: number;

  @Column({ type: "integer", nullable: true })
  quantidade: number | null;

  // PostgreSQL retorna numeric como string para preservar a precisao.
  @Column({ type: "numeric" })
  preco: string;

  @Column({ type: "numeric" })
  custo: string;

  @Column({ type: "varchar", nullable: true })
  produtonome: string | null;

  @Column({ type: "date", nullable: true })
  data: string | null;

  @Column({ type: "integer", nullable: true })
  produtoid: number | null;
}
