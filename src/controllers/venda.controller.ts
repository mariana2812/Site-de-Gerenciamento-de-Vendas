import { Request, Response } from "express";
import { getVendasService } from "../services/venda/getVendas.service";
import { createVendaService } from "../services/venda/createVenda.service";
import { updateVendaService } from "../services/venda/updateVenda.service";
import { deleteVendaService } from "../services/venda/deleteVenda.service";

export const vendaController = {
  //GET /vendas?mes=2026-11
  async getVendas(req: Request, res: Response) {
    const mes = req.query.mes as string | undefined;
    const vendas = await getVendasService(mes);

    res.status(200).json(vendas);
  },
  async createVenda(req: Request, res: Response) {
    const vendaData = req.body;
    const venda = await createVendaService(vendaData);

    res.status(201).json(venda);
  },
  async updateVenda(req: Request, res: Response) {
    const vendaId: string = req.params.id as string;
    const vendaData = req.body;
    const venda = await updateVendaService(vendaId, vendaData);

    res.status(200).json(venda);
  },
  async deleteVenda(req: Request, res: Response) {
    const vendaId: string = req.params.id as string;
    await deleteVendaService(vendaId);

    res.status(204).send();
  },
};
