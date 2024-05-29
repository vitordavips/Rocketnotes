// chamou o Router de dentro do próprio express
const { Router } = require("express");

// chamando o Controller
const UsersController = require("../controllers/UsersController");

// chamando o Avatar do user para ser atualizado.
const UsersAvatarController = require("../controllers/UsersAvatarController");

// chamando o middware
const ensureAuthenticated = require("../middwares/ensureAuthenticated");

// Depois inicializou o Router aqui
const usersRoutes = Router();

// Instanciar a classe usersController
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();
const multer = require("multer");
const uploadConfig = require("../configs/upload");


const upload = multer(uploadConfig.MULTER);

// Agora coloco o "userRoutes" no lugar do "app" e o controller
usersRoutes.put("/",  ensureAuthenticated, usersController.update);
usersRoutes.post("/", usersController.create);

//O patch vai fazer a alteração de um arquivo no banco.
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), usersAvatarController.update)

//Estou expotando para quem quiser utilizar o arquivo
module.exports = usersRoutes;