import { Request, Response } from "express";
import { getProdutosService } from "../services/produto/getProdutos.service";
import { createProdutoService } from "../services/produto/createProduto.service";
import { updateProdutoService } from "../services/produto/updateProduto.service";
import { deleteProdutoService } from "../services/produto/deleteProduto.service";

export const produtoController = {
  async getProdutos(req: Request, res: Response) {
    const produtos = await getProdutosService();

    res.status(200).json(produtos);
  },
  async createProduto(req: Request, res: Response) {
    const produtoData = req.body;
    const produto = await createProdutoService(produtoData);

    res.status(201).json(produto);
  },
  async updateProduto(req: Request, res: Response) {
    const produtoId: string = req.params.id as string;
    const produtoData = req.body;
    const produto = await updateProdutoService(produtoId, produtoData);

    res.status(200).json(produto);
  },
  async deleteProduto(req: Request, res: Response) {
    const produtoId: string = req.params.id as string;
    await deleteProdutoService(produtoId);

    res.status(204).send();
  },
};
