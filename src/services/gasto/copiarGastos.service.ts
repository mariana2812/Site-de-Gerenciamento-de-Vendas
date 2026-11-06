import { AppError } from "../../../error";
import { AppDataSource } from "../../connection";
import { Despesa as Gasto } from "../../entities/despesa.entitie";
import { CopiarGastos } from "../../schemas/gasto.schemas";

//COPIA OS GASTOS DE UM MÊS PRO OUTRO, PRA MARIA SÓ AJUSTAR OS VALORES QUE MUDARAM
export const copiarGastosService = async (
  dados: CopiarGastos,
): Promise<Gasto[]> => {
  const gastoRepository = AppDataSource.getRepository(Gasto);

  const gastosOrigem: Gasto[] = await gastoRepository.find({
    where: { mes: dados.de },
  });
  if (gastosOrigem.length === 0) {
    throw new AppError("Não há gastos no mês de origem para copiar", 404);
  }

  const jaExistem: number = await gastoRepository.count({
    where: { mes: dados.para },
  });
  if (jaExistem > 0) {
    throw new AppError("O mês de destino já tem gastos cadastrados", 409);
  }

  const novosGastos = gastoRepository.create(
    gastosOrigem.map((gasto) => ({
      descricao: gasto.descricao,
      valor: gasto.valor,
      mes: dados.para,
    })),
  );
  await gastoRepository.save(novosGastos);

  return novosGastos;
};
