const fs = require("fs");
const path = require("path");
const DEST_PATH = path.resolve(__dirname, "..", "..", "..", "public");

export default function generateCollboratorsJson(collaborators) {
  const collaboratorsLogin = collaborators.map((collaborator) => {
    return collaborator.login;
  });

  fs.writeFileSync(
    `${DEST_PATH}/init/collaborators.json`,
    JSON.stringify(collaboratorsLogin)
  );
}
