//criando uma sessão
const knex = require("../database/knex");
const AppError = require("../utils/AppErro.js");
const { compare } = require("bcryptjs");
const authConfig = require("../configs/auth.js");
const { sign } = require("jsonwebtoken");

class SessionsController {
    async create(request, response) {
        const {email, password} = request.body;

        // validando o usuário
        const user = await knex("users").where({ email }).first();

        if(!user) {
            throw new AppError("Usuário Inválido", 401);
        }

        // Validando senha
        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new AppError("Senha Inválida", 401);
        }

        //token
        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return response.json({ user, token });
    }
}

module.exports = SessionsController;