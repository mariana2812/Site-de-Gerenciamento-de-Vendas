// import { userRoutes } from './src/routes/user.router';
import express from "express"
import { handleErrors } from "./error"
import { AppDataSource } from "./src/connection"

export const app = express()

app.use(express.json())

//IMPORTA A VARIAVEL DE CONEXÃO E INICIA
AppDataSource.initialize().then(() => {
    console.log("Database connected")
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})

// app.use("/user", userRoutes)

app.use(handleErrors)