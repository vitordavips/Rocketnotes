// chamou o Router de dentro do próprio express
const { Router } = require("express");

// chamando o Controller
const TagsController = require("../controllers/TagsController");
// chamando o middware
const ensureAuthenticated = require("../middwares/ensureAuthenticated");


// Depois inicializou o Router aqui
const tagsRoutes = Router();


// Instanciar a classe TagsController
const tagsController = new TagsController();

// Agora coloco o "tagsRoutes" no lugar do "app" e o controller.
tagsRoutes.get("/", ensureAuthenticated, tagsController.index);

//Estou expotando para quem quiser utilizar o arquivo
module.exports = tagsRoutes;