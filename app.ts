import { loginRoutes } from "./src/routes/login.routes";
import { usuarioRoutes } from "./src/routes/usuario.routes";
import { produtoRoutes } from "./src/routes/produto.routes";
import { vendaRoutes } from "./src/routes/venda.routes";
import { gastoRoutes } from "./src/routes/gasto.routes";
import { resumoRoutes } from "./src/routes/resumo.routes";
import express from "express";
import { handleErrors } from "./error";
import { AppDataSource } from "./src/connection";
import { seedService } from "./src/services/seed.service";

export const app = express();

app.use(express.json());

app.use("/login", loginRoutes);
app.use("/usuario", usuarioRoutes);
app.use("/produtos", produtoRoutes);
app.use("/vendas", vendaRoutes);
app.use("/gastos", gastoRoutes);
app.use("/resumo", resumoRoutes);

app.use(handleErrors);

if (require.main === module) {
  AppDataSource.initialize()
    .then(async () => {
      console.log("Database connected");
      await seedService();
      const server = app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000");
      });
      server.on("error", async (error) => {
        console.error("Erro ao iniciar o servidor:", error);
        process.exitCode = 1;
        try {
          await AppDataSource.destroy();
        } catch (cleanupError) {
          console.error("Erro ao encerrar a conexao:", cleanupError);
        }
      });
    })
    .catch(async (error: unknown) => {
      console.error("Erro ao inicializar a API:", error);
      process.exitCode = 1;
      if (AppDataSource.isInitialized) {
        await AppDataSource.destroy().catch((cleanupError: unknown) => {
          console.error("Erro ao encerrar a conexao:", cleanupError);
        });
      }
    });
}
