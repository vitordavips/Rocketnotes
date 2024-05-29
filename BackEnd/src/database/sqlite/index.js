// Esse sqlite é o drive que vai ser utilizado no caso a versão
const sqlite3 = require("sqlite3");

// Esse fica responsavel pela conecção
const sqlite = require("sqlite");

//O path vai resolver o problema de endereços de acordo com o ambiente.
const path = require("path");

//Se não existe o arquivo no banco essa função vai criar.
//essa função vai criar o arquivo database se ele não existir.
async function sqliteConnection(){
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"), 
        driver: sqlite3.Database
    });

    return database;
}

module.exports = sqliteConnection;