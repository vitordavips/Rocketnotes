// chamou o Router de dentro do próprio express
const { Router } = require("express");

// chamando o Controller
const NotesController = require("../controllers/NotesController");
// chamando o middware
const ensureAuthenticated = require("../middwares/ensureAuthenticated");


// Depois inicializou o Router aqui
const notesRoutes = Router();


// Instanciar a classe usersController
const notesController = new NotesController();

//Esse comando vai passar o ensureAuthenticated para todas as rotas.
notesRoutes.use(ensureAuthenticated);

// Agora coloco o "notesRoutes" no lugar do "app" e o controller.
notesRoutes.get("/", notesController.index);
notesRoutes.post("/", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);

//Estou expotando para quem quiser utilizar o arquivo
module.exports = notesRoutes;