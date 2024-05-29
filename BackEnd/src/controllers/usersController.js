// O controller só pode ter no máximo essas 5 funções 
/**
 *  index = GET para listar vários registros.
 *  show = GET para exibir um registro especifico.
 *  create = POST para criar um registro.
 *  uptade = PUT para atualizar um registro.
 *  delete = DELETE para renovar um registro.
*/

//O hash que vai gerar a criptografia.
const { hash, compare } = require("bcryptjs");

//Aqui ele vai está importando o erro do lado do cliente.
const AppError = require("../utils/AppErro");

//Aqui ele está importando a conecxão com o banco de dados.
const sqliteConnection = require("../database/sqlite")

class UsersController {
    async create(req, res) {
        const { name, email, password } = req.body;
        //const user_id = req.user.id;
        
        const database = await sqliteConnection();
        
        //Aqui vai verificar se existe um usuário com email, para isso coloquei uma variável email.
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        //Aqui vai mandar o aviso que o email já existe.
        if(checkUserExists){
            throw new AppError("ESte e-mail já está em uso.");
        }

        // Aqui vai ser iniciado a função hash(senha, fator de complexidade do hash).
        const hashedPassword = await hash(password, 8);

        //Aqui vai inserir os dados do usuário
        await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

        return res.status(201).json();

        //res.json({name, email, password});
    }

    async update(req, res){
        const { name, email, password, old_password } = req.body;
        const user_id = req.user.id;

        // Conecção com o Banco de Dados
        const database = await sqliteConnection();
        
        // Busca o usuário dando um SELECT na tabela users, onde o id é igual a do params.
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

        // Se o usuário não existi, vai abrir uma exceção com uma resposta.
        if (!user) {
            throw new AppError("Usuário não encontrado");
        };

        //Aqui vai verificar se o usuário vai cadastrar um email que já existe.
        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        //Esse if vai verificar se o usuário colocou o mesmo email de outro usuário.
        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("Este e-mail já está em uso.")
        };

        //Aqui vai passar para o novo name e email novo.
        user.name = name ?? user.name;
        // O ?? é um operador lógico que colocar algum dos dois lados.
        user.email = email ?? user.email;

        // Se o usuário digitou a antiga senha e esqueceu a antiga vai aparecer o aviso.
        if(password && !old_password) {
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha.")
        }

        // Se quando o password e old_password for informado, verifique se a senha antiga é igual a do banco.
        if(password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);

            // Se o checkOld for falso mostre a mensagem.
            if(!checkOldPassword){
                throw new AppError("A Senha antiga não confere.")
            };

            // Se a senha for igual deixa atualizar.
            user.password = await hash(password, 8);
        }

        //Aqui é executado o update.
        await database.run(`
            UPDATE users SET 
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, user_id]
        ); 

        return res.status(200).json();
        
    }
};

module.exports = UsersController;