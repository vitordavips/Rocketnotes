// O fs vai ajudar na manipulação de arquivos.
const fs = require("fs");
// O path ajudar na navergação dos diretorios.
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorage{
    async saveFile(file){
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        );

        return file;
    }

    async deleteFile(file){
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

        try{
            //O comando stat mostra o status do arquivo. Ex: arquivo corrompido
            await fs.promises.stat(filePath);
        } catch{
            return;
        }
        //O comando unlink remove o arquivo.
        await fs.promises.unlink(filePath);
    }
};

module.exports = DiskStorage;