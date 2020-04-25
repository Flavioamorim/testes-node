const assert = require('assert')
const Postgres = require('./../db/strategies/postgres')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())

const MOCK_HEROI_CADASTRAR = {
    nome: 'Gaviao Negro',
    poder: 'Golaçooo',
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Gaviao Negro',
    poder: 'Golaçooo',
}

describe('postgress strategy', function () {
    this.timeout(Infinity)
    it('Postgress connection', async function () {
        const result = await context.isConnected()
        assert.equal(result, true)
    })

    it('Cadastrar heroi', async function () {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('Listar heroi', async function () {
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('Atualizar heroi', async function () {
        const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome })
        // rest/spread utilizado para mergear objetos
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher magavilha'
        }
        const [result] = await context.update(itemAtualizar.id, novoItem)

        assert.deepEqual(result, 1)
    })

    it('Remover por id', async function () {
        const [item] = await context.read({})
        const result = await context.delete(item.id)

        assert.deepEqual(result, 1)
    })
})
