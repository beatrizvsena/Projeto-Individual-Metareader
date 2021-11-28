

function homecad() {

    window.location.href = 'cadastro.html';

}

function limparFormulario() {
    document.getElementById("form_cadastro").reset();
}

function cadastrar() {

    var formulario = new URLSearchParams(new FormData(document.getElementById("form_cadastro")));

    var nome = formulario.get("nome");
    var email = formulario.get("email");
    var usuario = formulario.get("usuario");
    var senha = formulario.get("senha");
    var confirmacaoSenha = formulario.get("senhaconfir");


    if (nome == "" || email == "" || usuario == "" || senha == "" || confirmacaoSenha == "") {

        window.alert("Preencha todos os campos para prosseguir!");
        if (nome == "") {
            console.log('nome está em branco')
        }
        if (email == "") {
            console.log('email está em branco')
        }
        if (usuario == "") {
            console.log('usuario está em branco')
        }
        if (senha == "") {
            console.log('senha está em branco')
        }
        if (confirmacaoSenha == "") {
            console.log('confirmacaoSenha está em branco')
        }
        return false;
    }

    if (email.indexOf("@") == -1 || email.indexOf(".com") == -1) {
        window.alert("Seu e-mail está inválido!");
        return false;
    }

    if (usuario.length < 8) {
        window.alert("Seu usário contém menos de 8 digitos");
        return false;
    }

    if (senha != confirmacaoSenha) {
        window.alert("As senhas inseridas não coincidem!");
        return false;
    }

    fetch("/usuarios/cadastrar", {
        method: "POST",
        body: formulario
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            window.alert("Cadastro realizado com sucesso!");
            window.location = "login.html";
            limparFormulario();
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}

function entrar() {

    var formulario = new URLSearchParams(new FormData(document.getElementById("form_login")));

    var usuario = formulario.get("usuariolog");
    var senha = formulario.get("senhalog");

    console.log("FORM LOGIN: ", usuario);
    console.log("FORM SENHA: ", senha);


    if (usuario == "" || senha == "") {
        window.alert("Preencha todos os campos para prosseguir!");
        return false;
    }

    fetch("/usuarios/autenticar", {
        method: "POST",
        body: formulario
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                setTimeout(function () {
                    alert(`Olá ${usuario}, seja bem vindo! Você será redirecionado a sua dashboard.`);
                    window.location = "./dashboard.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}



function att() {


    if (Number(livrolido.value) == 0 || Number(tempolido.value) == 0 || Number(paginaslidas.value) == 0) {
        alert("Insira todos os dados")
    }
    else {

        var formulario = new URLSearchParams(new FormData(document.getElementById("analise")));
        var li = formulario.get("nlivro");
        var te = formulario.get("npgs");
        var pg = formulario.get("tlivro");

        fetch("/usuarios/analisar", {

            method: "POST",
            body: formulario
        }).then(function (resposta) {

            console.log("reposta: ", resposta);

            if (resposta.ok) {
                resultado();
            }
            else {
                alert("erro")
            }
        }).catch(function (resposta) {

            console.log(`#ERRO: ${resposta}`);

        });

    }

}

function resultado() {

    fetch("/usuarios/resultado", {

        method: "GET",
    }).then(function (resposta) {

        resposta.json().then(function (data) {
            for (let i = 0; i < data.length; i++) {
                let arquivo = data[i];
                console.log(arquivo);
                document.getElementById('numlidos').innerHTML = arquivo.qtd_livro;
                document.getElementById('numtempo').innerHTML = arquivo.tempo;
                document.getElementById('numpags').innerHTML = arquivo.num_pags;
            }
        });
    }).catch(function (error) {
        console.error(`ERROR`, error);

    })



}

function calcular() {

    var np = numdpags.value;
    var mt = mediatempo.value;

    var total = np / mt;

    if (nomelivro.value == 0 || np == 0 || mt == 0) {
        alert("Insira os dados para calcular")

    }

    else {

        msgresult.innerHTML = `Você lerá o livro ${nomelivro.value} em aproximadamente ${(total).Math.floor()} dias se lendo ${totalpgs} páginas por dia `

    }

}

function sorteio() {

    var sort = Math.random() * 1 + 1;


    if (genero.value == '') {
        alert("Escolha um gênero para sortear")
    }

    else {

        if (genero.value == 'fantasia' && sort.toFixed() == 1) {
            msgsort.innerHTML = `Você deveria ler <a href= 'https://www.amazon.com.br/Six-crows-mentiras-Leigh-Bardugo/dp/8582353820'>Six Of Crows </a>`;

        }

        else if (genero.value == 'fantasia' && sort.toFixed() == 2) {
            msgsort.innerHTML = `Você deveria ler <a href= 'https://www.amazon.com.br/BOX-HARRY-POTTER-TRADICIONAL-Rowling/dp/6555320478/ref=pd_lpo_1?pd_rd_i=6555320478&psc=1' > Harry Potter </a>`;

        }

        else if (genero.value == 'romance' && sort.toFixed() == 1) {
            msgsort.innerHTML = `Você deveria ler <a href= 'https://www.amazon.com.br/Orgulho-Preconceito-Jane-Austen/dp/8544001823' > Orgulho e Preconceito </a>`;


        }

        else if (genero.value == 'romance' && sort.toFixed() == 2) {
            msgsort.innerHTML = `Você deveria ler <a href= 'https://www.amazon.com.br/Dom-Casmurro-Machado-Assis/dp/859431860X' > Dom Casmurro </a>`;


        }

        else if (genero.value == 'thriller' && sort.toFixed() == 1) {
            msgsort.innerHTML = `Você deveria ler <a href= 'https://www.amazon.com.br/coisa-Stephen-King/dp/8560280944' > It - A Coisa </a>`;


        }

        else if (genero.value == 'thriller' && sort.toFixed() == 2) {
            msgsort.innerHTML = `Você deveria ler <a href= 'https://www.amazon.com.br/Caixa-P%C3%A1ssaros-Josh-Malerman/dp/8580576520' > Caixa de Pássaros </a>`;


        }

        else if (genero.value == 'ficcao' && sort.toFixed() == 1) {
            msgsort.innerHTML = `Você deveria ler <a href= 'https://www.amazon.com.br/1984-George-Orwell/dp/8535914846' > 1984</a>`;


        }

        else if (genero.value == 'ficcao' && sort.toFixed() == 2) {
            msgsort.innerHTML = `Você deveria ler <a href= 'https://www.amazon.com.br/Admir%C3%A1vel-mundo-Aldous-Leonard-Huxley/dp/8525056006' > Admirável Mundo Novo </a>`;


        }

        else if (genero.value == 'autoajuda' && sort.toFixed() == 1) {
            msgsort.innerHTML = `Você deveria ler <a href='https://www.amazon.com.br/coragem-ser-imperfeito-Bren%C3%A9-Brown/dp/8543104335'> A Coragem de Ser Imperfeito </a>`;


        }

        else if (genero.value == 'autoajuda' && sort.toFixed() == 2) {
            msgsort.innerHTML = `Você deveria ler <a href= 'https://www.amazon.com.br/Mindset-Carol-S-Dweck/dp/8547000240'> Mindset </a>`;


        }

    }


}