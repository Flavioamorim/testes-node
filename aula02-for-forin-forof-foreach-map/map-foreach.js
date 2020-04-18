const service = require('./service')

async function main() {
  try {
    //get info
    const results = await service.obterPessoas(`a`)

    // with foreach
    const names = []
    results.results.forEach(function (item) {
      names.push(item.name)
    });

    // with map
    const namesMap = results.results.map(function (pessoa) {
      return pessoa.name;
    })

    // with map flexivel
    const namesMapFlex = results.results.map((pessoa) => pessoa.name)

    console.log('names', names)
    console.log('namesMap', namesMap)
    console.log('namesMapFlex', namesMapFlex)

  } catch (e) {
    console.error(`Deu ruim`, names)
  }
}

main()
