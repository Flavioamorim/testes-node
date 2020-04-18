


const contextMongo = new ContextStrategy(new MongoDB);
contextMongo.create('test')

const contextPostgre = new ContextStrategy(new Postgres);
contextPostgre.create('test')