const ICrud = require('./interfaces/interfaceCrud')

class MongoDB extends ICrud {

    constructor() {
        super()
    }

    create(item) {
        console.log("item salvo no mongo")
    }

    read(item) {
        console.log("item listado do mongo")
    }
}

module.exports = MongoDB