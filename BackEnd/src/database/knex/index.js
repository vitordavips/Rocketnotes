// O config vai trazer as informações do knexfile.
const config = require("../../../knexfile");
// Importando o knex.
const knex = require("knex");

const connection = knex(config.development);


module.exports = connection;