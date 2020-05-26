const assert = require('assert')
const api = require('../src/api')


describe('Suite de testes da API Heroes', function () {
    this.beforeAll(async ()=> {
        app = await api
    })


    it('Listar /herois deve retornar erro com limite incorreto', async () => {

        const TAMANTO_LIMITE = 'Aeee'
        const result = await app.inject({
            method: 'GET',
            url: `/heroes?skip=0&limit=${TAMANTO_LIMITE}`
        })

        assert.deepEqual(result.payload, 'Internal Server Error')
    })

    it('Listar /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url:'/heroes?nome=Gaviao'
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
    })

    it('listar /herois - deve retornar somente 10 registos', async ()=> {
        const TAMANTO_LIMITE = 10
        const result = await app.inject({
            method:'GET',
            url: `/heroes?skip=0&limit=${TAMANTO_LIMITE}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        console.log('dados', dados)

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length, TAMANTO_LIMITE)
    })

})