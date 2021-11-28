var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM cadastro;
    `;
    console.log("Executando a instrução SQL: \n"+instrucao);
    return database.executar(instrucao);
}

function entrar(usuario, senha) {
    console.log("ACESSEI O USUARIO MODEL")
    var instrucao = `
        SELECT * FROM cadastro WHERE usuario = '${usuario}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n"+instrucao);
    return database.executar(instrucao);
}

function cadastrar(nome, email, usuario, senha) {
    console.log("ACESSEI O USUARIO MODEL")
    var instrucao = `
        INSERT INTO cadastro (nomecompleto, email, usuario, senha) VALUES ('${nome}', '${email}', '${usuario}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n"+instrucao);
    return database.executar(instrucao);
}

function analisar(li, te, pg) {

var instrucao = `
INSERT INTO analise (qtd_livro, tempo, num_pags) VALUES ('${li}', '${te}', '${pg}');
`;
return database.executar(instrucao);


}

function resultado() {

    var instrucao = `SELECT sum(qtd_livro) as 'qtd_livro', sum(tempo) as 'tempo', sum(num_pags) as 'num_pags' FROM analise;`;
    return database.executar(instrucao);
    
    
    }

module.exports = {
    entrar,
    cadastrar,
    listar,
    analisar,
    resultado
};