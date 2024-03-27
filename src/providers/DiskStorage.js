const fs = require("fs"); // lidar com manipulação de arquivos


const path = require("path"); // lidar com os diretórios
const uploadConfig = require("../configs/upload");

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      //  O rename tem como função renomear ou mover um arquivo. O rename está recebendo 2 parâmetros.
      path.resolve(uploadConfig.TMP_FOLDER, file), // 1º parâmetro define onde o arquivo está.
      path.resolve(uploadConfig.UPLOADS_FOLDER, file) // 2º parâmetro define para onde o arquivo irá.
    )

    return file;
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);
    try {
      await fs.promises.stat(filePath); // stat verificar o estado do arquivo. ex: está aberto, está corrompido, está disponível
    } catch {
      return;
    }

    await fs.promises.unlink(filePath); // unlink remove o arquivo.
  }
}

module.exports = DiskStorage;
