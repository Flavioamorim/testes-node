const service = require('./service')

async function main() {
  try {
    const result = await service.obterPessoas('a')

    // ========================================================
    //with for
    // const namesFor = []
    // console.time('for')
    // for (let i = 0; i <= result.results.length -1; i++) {
    //   // console.log(result.results)
    //   const pessoa = result.results[i]
    //   namesFor.push(pessoa.name)
    // }
    // console.timeEnd('for')
    // console.log(`namesFor`, namesFor)
    // ========================================================
    //with forin
    // console.time('forin')
    // const namesForin = []
    // for (let i in result.results) {
    //   const pessoa = result.results[i]
    //   namesForin.push(pessoa.name)
    // }
    // console.log(`namesForin`, namesForin)
    // console.timeEnd('forin')
    // ========================================================

    console.time('forof')
    const namesForof = []
    for(pessoa of result.results) {
      namesForof.push(pessoa.name)
    }
    console.log(`namesForof`, namesForof)
    console.timeEnd('forof')

  }catch (e) {
    console.error(`Deu ruim`, e)
  }
}

main()
