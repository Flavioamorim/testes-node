const BaseRoute = require('./base/baseRoute')

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/heroes',
            method: 'GET',
            handler: (request, head) => {
                try {

                    const {
                        skip,
                        limit,
                        nome
                    } = request.query
                    console.log('limit', limit)

                    let query = {}
                    if (nome) {
                        query.nome = nome
                    }

                    if (limit && isNaN(limit)) {
                        throw Error('Limite incorreto');
                    }
                    if (skip && isNaN(skip)) {
                        throw Error('skip incorreto');
                    }

                    return this.db.read()

                } catch (error) {
                    console.log('Deu ruim', error)
                    return 'Internal Server Error'
                }

            }
        }
    }
}

module.exports = HeroRoutes