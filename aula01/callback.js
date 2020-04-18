

// obter o numero de telefone a partir do ID 
// obeter o endereco do user pelo id 


function obterUsuario(callback) {
    setTimeout(() => {
        return callback(null, {
            id: 1,
            nome: 'flavio',
            dataNascimento: new Date()
        })
    }, 1000);
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: 46848461511,
            ddd: '31'
        })
    }, 2000);
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            logradouro: 'rua teste tal',
            numero: '44'
        })
    }, 2000);
}

obterUsuario(function resolverUsuario(error, usuario) {

    if (error) {
        console.log('deu ruim', error)
        return;
    }
    console.log(usuario)

    obterTelefone(usuario.id, function resolveTelefone(error1, telefone){
        if (error1) {
            console.log('deu ruim', error1)
            return;
        }
        console.log(telefone)

        obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
            if (error2) {
                console.log('deu ruim', error1)
                return;
            }
            console.log(endereco)
        });
    });

});
// const telefone = obterTelefone(usuario.id);

// console.log('usuario', usuario);
// console.log('telefone', telefone);