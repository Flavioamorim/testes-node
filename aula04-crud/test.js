
const { deepEqual } = require('assert')

const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    nome: "Flash",
    poder: 'speed',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: "Lanterna Verde",
    poder: 'Energia do Anel',
    id: 2
}

describe('Switch manipulacao de herois', () => {

    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })

    it('deve pesquisar um heroi usando arquivos bor id', async () => {

        const expected = DEFAULT_ITEM_CADASTRAR
        // os cochetes é para filtrar a primeira posicao do array,[primeira, segunda, terceira...]
        const [resultado] = await database.listar(expected.id)

        deepEqual(resultado, expected)
    })

    it('deve cadastrar heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)

        deepEqual(actual, expected)
    })

    it('deve removar o heroi', async () => {

        const expected = true
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(expected, resultado)
    })

    it('deve atualizar heroi pelo id', async () => {

        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'dinheiro'
        }

        const novoDado = {
            nome: 'Batman',
            poder: 'dinheiro'
        }

        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)

        deepEqual(resultado, expected)
    })
})
