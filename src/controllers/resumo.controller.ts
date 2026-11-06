import { Request, Response } from "express";
import { getResumoService } from "../services/resumo/getResumo.service";

export const resumoController = {
  //GET /resumo?mes=2026-11 (SEM MÊS, USA O MÊS ATUAL)
  async getResumo(req: Request, res: Response) {
    const mes =
      (req.query.mes as string | undefined) ??
      new Date().toISOString().slice(0, 7);
    const resumo = await getResumoService(mes);

    res.status(200).json(resumo);
  },
};
