const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context(new MongoDb())

const MOCK_HEROI_CADASTRAR = {
    nome: 'Gaviao Negro',
    poder: 'Golaçooo',
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Gaviao Negro',
    poder: 'Golaçooo',
}

const MOCK_HEROI_DEFAULT = {
    nome: `HOMI SPIDER-${Date.now()}`,
    poder: 'TEIA NELES',
}

describe('MongoDB strategy', function () {
    this.beforeAll(async () => {
        // await context.connect()
        await context.create(MOCK_HEROI_DEFAULT)
    })
    it('Verificar conexao', async () => {
        const expected = 'Conectado'
        const result = await context.isConnected()

        console.log("statuss:", result);

        assert.deepEqual(result, expected)
    })

    it('cadastrar heroi', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)

        assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
    })

    it('Listar heroi', async () => {
        const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome })

        const result = {
            nome, poder
        }
        assert.deepEqual(result, MOCK_HEROI_DEFAULT)
    })
})
