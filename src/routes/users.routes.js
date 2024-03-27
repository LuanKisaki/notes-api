const { Router } = require("express");
const multer = require("multer"); // usado para carregar a imagem.
const uploadConfig = require("../configs/upload");

const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated"); // Permite, nega, fiscaliza ou direciona uma request

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);
// const outraBiblioteca = multer(uploadConfig.OUTRA_BIBLIOTECA);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch( "/avatar",  ensureAuthenticated,  upload.single("avatar_"), 

userAvatarController.update); // patch é usado para atualizar um campo específico.

module.exports = usersRoutes;
