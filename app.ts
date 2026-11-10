import express from "express"
import cors from "cors"
import { handleErrors } from "./error"
import { AppDataSource } from "./src/connection"
import { seedService } from "./src/services/seed.service"
import { loginRoutes } from "./src/routes/login.routes"
import { usuarioRoutes } from "./src/routes/usuario.routes"
import { produtoRoutes } from "./src/routes/produto.routes"
import { vendaRoutes } from "./src/routes/venda.routes"
import { gastoRoutes } from "./src/routes/gasto.routes"
import { resumoRoutes } from "./src/routes/resumo.routes"

export const app = express()

//CORS LIBERA O FRONT (localhost:5173) PRA CHAMAR A API (localhost:3000)
app.use(cors())
app.use(express.json())

AppDataSource.initialize().then(async () => {
    console.log("Database connected")
    await seedService()
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})

app.use("/login", loginRoutes)
app.use("/usuario", usuarioRoutes)
app.use("/produtos", produtoRoutes)
app.use("/vendas", vendaRoutes)
app.use("/gastos", gastoRoutes)
app.use("/resumo", resumoRoutes)


app.use(handleErrors)  