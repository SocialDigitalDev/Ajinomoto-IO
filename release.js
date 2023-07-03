const fs = require("fs");
const parameter = process.argv.slice(2);
const pjson = require("./package.json");
const version = pjson.version;
const { exec, execSync } = require("child_process");
const Confirm = require("prompt-confirm");

if (parameter == "") {
  console.log("\x1b[33m%s\x1b[0m", "⚠️  Atenção! Parâmetro não encontrado.");
  console.log("\x1b[36m%s\x1b[0m", "ex: release.js major");
  process.exit();
}

function executeGitCommand(command) {
  return execSync(command)
    .toString("utf8")
    .replace(/[\n\r\s]+$/, "");
}

const branch = executeGitCommand("git branch --show-current");

function checkBrach(branch) {
  if (branch !== "develop") {
    console.log(
      "\x1b[33m%s\x1b[0m",
      "⚠️  Atenção Processo deve executar na branch develop."
    );
    process.exit();
  }
}

const updateRelease = version => {
  let arrayVersion = version.split(".");
  let newVersion = "";

  if (parameter == "major") {
    newVersion = [parseInt(arrayVersion[0]) + 1, 0, 0].concat().join(".");
  } else if (parameter == "minor") {
    newVersion = [parseInt(arrayVersion[0]), parseInt(arrayVersion[1]) + 1, 0]
      .concat()
      .join(".");
  } else if (parameter == "patch") {
    newVersion = [
      parseInt(arrayVersion[0]),
      parseInt(arrayVersion[1]),
      parseInt(arrayVersion[2]) + 1,
    ]
      .concat()
      .join(".");
  }

  console.log("\x1b[33m%s\x1b[0m", `Versão Atual: ${version}`);
  console.log("\x1b[32m%s\x1b[0m", `Nova Versão: ${newVersion}`);

  const prompt = new Confirm({
    name: { newVersion },
    message: "Atualizar Versão?",
  });

  prompt.run().then(function (answer) {
    if (answer) {
      updateVersion(newVersion);
      readChangeLog();
    } else {
      console.log("❌ Processo Encerrado!");
      process.exit();
    }
  });
};

const updateVersion = version => {
  const editJsonFile = require("edit-json-file");
  const files = ["manifest", "package"];

  try {
    files.map(file => {
      let data = editJsonFile(`${__dirname}/${file}.json`, {
        autosave: true,
      });

      data.set("version", `${version}`);
      data.save();
    });
  } catch (err) {
    console.log("❌ Erro em Atualizar os Arquivos as versões !");
  }
};

const readChangeLog = () => {
  const pjson = require("./manifest.json");
  const version = pjson.version;
  const date = new Date();
  let ref = null;
  const newLineChangeLog = `## [${version}] - ${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  const tasks = [];
  const lines = [];
  try {
    const data = fs.readFileSync("./CHANGELOG.md", "utf8").split(/\r?\n/);

    let arr = data;
    arr.forEach((line, idx) => {
      line = line.trim();

      if (line.includes("## [Unreleased]")) {
        ref = idx + 1;
      } else if (
        ref != null &&
        (line.startsWith("-") ||
          line.startsWith("### Added") ||
          line.startsWith("### Fixed") ||
          line.startsWith("### Changed") ||
          line.startsWith("### HotFix"))
      ) {
        line.startsWith("#") ? tasks.push(line) : tasks.push(` ${line}`);
        lines.push(idx + 1);
      } else {
        ref = null;
      }
    });

    tasks.unshift(newLineChangeLog);

    // remover linhas
    data.splice(lines[0] - 1, lines.length);
    // novas linhas
    data.splice(lines[0], 0, ...tasks);

    let newChangelog = data.join("\r\n");

    fs.writeFileSync("./CHANGELOG.md", newChangelog, { encoding: "utf-8" });

    try {
      executeGitCommand(`git checkout -b release/${version}`);
      executeGitCommand(`git add .`);
      executeGitCommand(`git commit -m "Release ${version}"`);
      executeGitCommand(`git tag ${version}`);
      executeGitCommand(`git push origin ${version}`);
      executeGitCommand(`git push origin release/${version}`);
      console.log("\x1b[32m%s\x1b[0m", `✅ Release Concluída `);
    } catch (e) {}
  } catch (err) {
    console.error(err);
  }
};

/* EXECUTE */
checkBrach(branch);
updateRelease(version);
