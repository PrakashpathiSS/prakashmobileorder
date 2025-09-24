/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

function ensureFile(filePath, content = "{}") {
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📂 Created folder: ${dir}`);
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`📝 Created file: ${filePath}`);
  } else {
    console.log(`✔️ File already exists: ${filePath}`);
  }
}

const androidFile = path.join(__dirname, "../android/app/git-info.json");
const iosFile = path.join(__dirname, "../ios/gitinfo.json");

// Default content (you can enrich with git commit hash later)
const defaultContent = JSON.stringify({  }, null, 2);

ensureFile(androidFile, defaultContent);
ensureFile(iosFile, defaultContent);
