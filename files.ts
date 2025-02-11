const path = require("path");
const fs = require("fs");
const { promises: fsPromises } = fs;

class Files {
  encoding = "";
  FILES_DIR = "/";
  constructor(encoding = "utf8") {
    this.encoding = encoding;
  }

  public readFile = async (fileName: string) => {
    return await fsPromises.readFile(
      path.join(__dirname, this.FILES_DIR, fileName),
      this.encoding
    );
  };

  public createFile = async (fileName: string, content: string) => {
    return await fsPromises.writeFile(
      path.join(__dirname, this.FILES_DIR, fileName),
      content
    );
  };

  public updateFile = async (fileName: string, content: string) => {
    return await fsPromises.appendFile(
      path.join(__dirname, this.FILES_DIR, fileName),
      content
    );
  };

  public deleteFile = async (fileName: string) => {
    return await fsPromises.unlink(
      path.join(__dirname, this.FILES_DIR, fileName)
    );
  };

  public copyFile = async (orignPath: string, targetPath: string) => {
    const readStream = fs.createReadStream(orignPath);
    const writeStream = fs.createWriteStream(targetPath);
    readStream.pipe(writeStream);
  };
}

export { Files };
