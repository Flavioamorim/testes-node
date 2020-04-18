const ICrud = require('./interfaces/interfaceCrud')

class Postgres extends ICrud {

    constructor() {
        super()
    }

    create(item) {
        console.log("item salvo no postgres")
    }

    read(item) {
        console.log("item listado no postgres")
    }
}

module.exports = Postgres