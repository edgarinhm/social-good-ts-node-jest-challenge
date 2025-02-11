const path = require("path");
const fs = require("fs");
const { promises: fsPromises } = fs;

export class Files {
  encoding = "";
  FILES_DIR = "/";
  constructor(encoding = "utf8") {
    this.encoding = encoding;
  }

  public async readFile (fileName: string) {
    return await fsPromises.readFile(
      path.join(__dirname, this.FILES_DIR, fileName),
      this.encoding
    );
  };

  public async createFile(fileName: string, content: string)  {
    return await fsPromises.writeFile(
      path.join(__dirname, this.FILES_DIR, fileName),
      content
    );
  };

  public async updateFile(fileName: string, content: string)  {
    return await fsPromises.appendFile(
      path.join(__dirname, this.FILES_DIR, fileName),
      content
    );
  };

  public async deleteFile (fileName: string)  {
    return await fsPromises.unlink(
      path.join(__dirname, this.FILES_DIR, fileName)
    );
  };

  public async copyFile (orignPath: string, targetPath: string)  {
    const readStream = fs.createReadStream(orignPath);
    const writeStream = fs.createWriteStream(targetPath);
    readStream.pipe(writeStream);
  };
}