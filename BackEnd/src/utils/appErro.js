//Criado para padronizar a resposta de erro
class AppError {
    message;
    statusCode;

    // O método constructor é iniciado quando a clase é instanciada.
    constructor(message, statusCode = 400){
        //O this.message vai repassar a informação para o message global.
        this.message = message;
        this.statusCode = statusCode;
    }

};

module.exports = AppError;