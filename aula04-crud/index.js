const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main(params) {

    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do heroi")
        .option('-p, --poder [value]', "Poder do heroi")
        .option('-i, --id [value]', "Id do heroi")
        .option('-c, --cadastrar', "Cadastrar um heroi")
        .option('-a, --atualizar [value]', "Atualizar um heroi")
        .option('-l, --listar [value]', "Listar um heroi all para todos")
        .option('-r, --remover', "Listar um heroi")
        .parse(process.argv)

    const heroi = new Heroi(Commander);
    try {
        if (Commander.cadastrar) {
            // delete heroi.id
            const resultado = await Database.cadastrar(heroi)

            if (!resultado) {
                console.error('Erro cadastrar heroi')
            }
        }
        if (Commander.listar) {

            if (Commander.listar === 'all') {
                const resultado = await Database.listar()
                console.log(resultado)
            } else {
                const resultado = await Database.listar(parseInt(Commander.listar))
                console.log(resultado)
            }
        }

        if (Commander.remover) {
            const resultado = await Database.remover(heroi.id)

            if (!resultado) {
                console.error('Error ao remover heroi')
            }

            console.log('Heroi cadastrado com sucesso')
        }

        if (Commander.atualizar) {
            const id = parseInt(Commander.atualizar)
            
            const resultado = await Database.atualizar(id, heroi)

            if (!resultado) {
                console.error('Nao foi possivel atualizar o heroi')
                return;
            }

            console.log('Heroi atualizado com sucesso !')
        }

    } catch (error) {
        console.error('Deu ruim', error)
    }
}

main()