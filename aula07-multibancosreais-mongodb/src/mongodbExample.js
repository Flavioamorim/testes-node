const Mongoose = require('mongoose')
// cria conexao
Mongoose.connect('mongodb://erickwendel:minhasenhasecreta@localhost:27017/herois',
    { useNewUrlParser: true }, function (error) {
        if (!error) return;
        console.log('Falha na conexao', error)
    })

const connection = Mongoose.connection
connection.once('open', () => console.log('Conexao rodando !!!'))
const state = Mongoose.connection.readyState
console.log('state', state)
//  0 disconectado
//  1 conectado 
//  2 conectando
//  3 disconectando


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

const model = Mongoose.model('herois', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Grana'
    })
    console.log(resultCadastrar)

    const listItens = model.find()
    console.log('lista de itens', listItens)
}

main()