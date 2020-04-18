function obterUsuario() {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                id: 1,
                nome: 'flavio',
                dataNascimento: new Date()
            })
        }, 1000);
    });
}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: 46848461511,
                ddd: '31'
            })
        }, 2000);
    });
}

function obterEndereco(idUsuario, callback) {

    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                logradouro: 'rua teste tal',
                numero: '44'
            })
        }, 2000);
    });
}

async function test() {

    try {
        const usuario = await obterUsuario();
        const telefone = await obterTelefone(usuario.id);
        const endereco = await obterEndereco(usuario.id);

        console.log(telefone)
    } catch (error) {
        console.error(" Deu ruim ", error);
    }
}


test();
// add async na function e ela retorna uma promise
