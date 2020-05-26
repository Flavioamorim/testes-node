const ICrud = require('./interfaces/interfaceCrud')
const Mongoose = require('mongoose')

const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectando'
}
class MongoDB extends ICrud {

    constructor() {
        super()
        this._driver = null
        this._heroes = null
        this.connect()
    }

    async isConnected() {
        const state = STATUS[this._driver.readyState]
        if (state === 'Conectado') return true;
        if (state !== 'Conectando') return state;

        if (state === 'Conectando') {
            await new Promise(resolve => setTimeout(resolve, 1000))
            return STATUS[this._driver.readyState]
        }
    }

    connect() {
        // cria conexao
        Mongoose.connect('mongodb://erickwendel:minhasenhasecreta@localhost:27017/herois',
            { useNewUrlParser: true }, function (error) {
                if (!error) return;
                console.log('Falha na conexao', error)
            })

        const connection = Mongoose.connection
        this._driver = connection
        connection.once('open', () => console.log('Conexao rodando !!!'))
        this.defineModel()
    }

    defineModel() {

        const heroiSchema = new Mongoose.Schema({
            nome: {
                type: String,
                required: true,
            },
            poder: {
                type: String,
                required: true,
            },
            insertedAt: {
                type: Date,
                default: new Date(),
            }
        })

        this._heroes = Mongoose.model('herois', heroiSchema)
    }

    async create(item) {
        const resultCadastrar = await this._heroes.create(item)
        return resultCadastrar
        console.log(resultCadastrar)
    }

    async read(item, skip=0, limit=10) {
        return await this._heroes.find(item).skip(skip).limit(limit)
    }
}

module.exports = MongoDB