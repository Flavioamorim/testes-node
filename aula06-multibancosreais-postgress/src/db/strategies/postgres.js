const ICrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')


class Postgres extends ICrud {

    constructor() {
        super()
        this._driver = null
        this._heroes = null
        this._connect()
    }

    async create(item) {
        const { dataValues } = await this._heroes.create(item)
        return dataValues
    }

    async read(item = {}) {
        return await this._heroes.findAll({ where: item, raw: true })
    }

    async update(id, params) {
        return await this._heroes.update(params, { where: { id: id } })
    }

    async delete(id) {
        return await this._heroes.destroy({ where: { id: id } })
    }

    async isConnected() {
        try {
            await this._driver.authenticate()
            return true;
        } catch (error) {
            console.log('error111', error)
            return false;
        }
    }

    async defineModel() {
        this._heroes = this._driver.define('heroes', {
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

        await this._heroes.sync()
    }

    // metodo privado, com underline
    _connect() {
        this._driver = new Sequelize(
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

        this.defineModel()
    }
}

module.exports = Postgres