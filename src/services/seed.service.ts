import bcrypt from "bcryptjs"
import { AppDataSource } from "../connection"
import { Gasto, Produto, Usuario } from "../entities"

//RODA QUANDO A API LIGA
//SE O BANCO ESTIVER VAZIO, CRIA OS DADOS INICIAIS DA MARIA
export const seedService = async () => {
    const usuarioRepository = AppDataSource.getRepository(Usuario)
    const produtoRepository = AppDataSource.getRepository(Produto)
    const gastoRepository = AppDataSource.getRepository(Gasto)

    //USUÁRIO DA MARIA (ELA PODE TROCAR E-MAIL E SENHA DEPOIS, NA TELA DE CONFIGURAÇÕES)
    if (await usuarioRepository.count() === 0) {
        const usuario = usuarioRepository.create({
            nome: "Maria",
            email: "maria@doces.com",
            senha: await bcrypt.hash("1234", 10),
            nomeloja: "Doces da Maria"
        })
        await usuarioRepository.save(usuario)
        console.log("Usuário padrão criado: maria@doces.com / 1234")
    }

    //O ÚNICO PRODUTO QUE ELA VENDE HOJE
    if (await produtoRepository.count() === 0) {
        const cupcake = produtoRepository.create({ nome: "Cupcake", preco: "8", custo: "4.5", ativo: true })
        await produtoRepository.save(cupcake)
    }

    //GASTOS FIXOS QUE ELA INFORMOU, NO MÊS ATUAL
    if (await gastoRepository.count() === 0) {
        const mes = new Date().toISOString().slice(0, 7)
        const gastos = gastoRepository.create([
            { descricao: "Internet", valor: "120", mes },
            { descricao: "Luz", valor: "230", mes },
            { descricao: "Água", valor: "90", mes }
        ])
        await gastoRepository.save(gastos)
    }
}