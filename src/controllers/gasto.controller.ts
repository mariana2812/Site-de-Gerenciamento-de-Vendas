import { Request, Response } from "express";
import { getGastosService } from "../services/gasto/getGastos.service";
import { createGastoService } from "../services/gasto/createGasto.service";
import { updateGastoService } from "../services/gasto/updateGasto.service";
import { deleteGastoService } from "../services/gasto/deleteGasto.service";
import { copiarGastosService } from "../services/gasto/copiarGastos.service";

export const gastoController = {
  //GET /gastos?mes=2026-11
  async getGastos(req: Request, res: Response) {
    const mes = req.query.mes as string | undefined;
    const gastos = await getGastosService(mes);

    res.status(200).json(gastos);
  },
  async createGasto(req: Request, res: Response) {
    const gastoData = req.body;
    const gasto = await createGastoService(gastoData);

    res.status(201).json(gasto);
  },
  async updateGasto(req: Request, res: Response) {
    const gastoId: string = req.params.id as string;
    const gastoData = req.body;
    const gasto = await updateGastoService(gastoId, gastoData);

    res.status(200).json(gasto);
  },
  async deleteGasto(req: Request, res: Response) {
    const gastoId: string = req.params.id as string;
    await deleteGastoService(gastoId);

    res.status(204).send();
  },
  async copiarGastos(req: Request, res: Response) {
    const gastos = await copiarGastosService(req.body);

    res.status(201).json(gastos);
  },
};
