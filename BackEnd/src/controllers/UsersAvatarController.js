const knex = require("../database/knex");
const AppError = require("../utils/appErro");
const DiskStorage = require("../providers/DiskStoroge");
const { diskStorage } = require("multer");

class UsersAvatarController {
    async update(request, response) {
        const user_id = request.user.id;
        const avatarFilename = request.file.filename;

        const diskStorageInstance = new DiskStorage(); // Renomeando a variável para evitar conflitos

        const user = await knex("users").where({ id: user_id }).first();

        if (!user) {
            throw new AppError("Somente usuários autenticados podem ", 401);
        }

        if (user.avatar) {
            await diskStorageInstance.deleteFile(user.avatar);
        }

        const filename = await diskStorageInstance.saveFile(avatarFilename);
        user.avatar = filename;

        await knex("users").update(user).where({ id: user_id });

        return response.json();
    }
}

module.exports = UsersAvatarController;
