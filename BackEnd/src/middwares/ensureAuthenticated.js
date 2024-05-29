const { verify, TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");
const AppError = require("../utils/AppErro");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;

    console.log("Auth Header:", authHeader);

    if (!authHeader) {
        console.error("JWT token não informado");
        throw new AppError("JWT token não informado", 401);
    }

    const [, token] = authHeader.split(" ");

    console.log("Token:", token);

    try {
        const { sub: user_id } = verify(token, authConfig.jwt.secret);

        console.log("User ID:", user_id);

        request.user = {
            id: Number(user_id),
        };

        console.log("Usuário autenticado:", request.user);

        return next();
    } catch (error) {
        //throw new AppError("JWT token não informado", 401);
        if (error instanceof TokenExpiredError) {
            console.error("Token expirado:", error.message);
            throw new AppError("Token expirado", 401);
        } else if (error instanceof JsonWebTokenError) {
            console.error("Erro no JWT:", error.message);
            throw new AppError("Erro no JWT", 401);
        } else {
            console.error("Erro desconhecido:", error.message);
            throw new AppError("Erro desconhecido", 401);
        }
    }
}

module.exports = ensureAuthenticated;
