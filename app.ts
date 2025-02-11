import { Files } from "./files";

const file = new Files();

export const loadFile = async (file) => {
  try {
    const data = await file.readFile("index.html");
    await file.createFile(
      "index.html",
      data?.replace(
        "%version%",
        `<script>
          let version = OTParser.GetVersion();
          let spanVersion = document.getElementById("version");
          spanVersion.textContent = version;
        </script>`
      )
    );
  } catch (error) {
    throw error;
  }
};

loadFile(file);
