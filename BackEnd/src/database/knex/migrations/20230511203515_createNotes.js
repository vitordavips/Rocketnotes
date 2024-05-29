//Método responsável por criar ou alterar algo no banco de dados.
exports.up = knex => knex.schema.createTable("notes", table => {
    table.increments("id");
    table.text("title");
    table.text("description");
    // Esse campo vai fazer uma referência a tabela users.
    table.integer("user_id").references("id").inTable("users");

    //Aqui está criando um campo chamado "created_at" em uma tabela e definindo o valor padrão desse campo como a data e hora atuais.
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
}); 

//Método responsável por Deleta a tabela.
exports.down = knex => knex.schema.dropTable("notes")