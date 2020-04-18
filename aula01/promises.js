

// obter o numero de telefone a partir do ID 
// obeter o endereco do user pelo id 


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
    setTimeout(() => {
        return callback(null, {
            logradouro: 'rua teste tal',
            numero: '44'
        })
    }, 2000);
}

const usuarioPromise = obterUsuario();

usuarioPromise
    .then(function (usuario) {

        return obterTelefone(usuario.id).then(function (result) {
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: {
                    telefone: result
                }
            }
        });

    }).then(function (resultado) {

        console.log(resultado)

    })
    // .then(function (endereco) {
    //     console.log(endereco)
    // })
    .catch(function error(error) {
        console.log('deu ruim', error)
    });