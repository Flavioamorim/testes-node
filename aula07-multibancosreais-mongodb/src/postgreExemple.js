const Sequelize = require('sequelize')

const driver = new Sequelize(
    'heroes',
    'erickwendel',
    'minhasenhasecreta',
    {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false,
    }
)


async function main() {

    const Heroes = driver.define('heroes', {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING,
            required: true,
        },
        poder: {
            type: Sequelize.STRING,
            required: true,
        }
    }, {
        tableName: 'TB_HEROIS',
        freezeTableName: false,
        timestamps: false
    })

    await Heroes.sync()

    // se omitir o raw, traz muitas informações desnecessárias
    const result = await Heroes.findAll({ raw: true })

    console.log('result', result)

}

main()