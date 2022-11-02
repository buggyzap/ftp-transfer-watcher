#!/usr/bin/env node
import { watch, writeFile } from "node:fs";
import * as ftp from "basic-ftp";
import * as fs from "fs-extra";
import { config } from "./config.js";
import Enquirer from "enquirer";
import Parse from "args-parser";
import { exec } from "child_process";
import shelljs from "shelljs";

const { prompt } = Enquirer;

const args = Parse(process.argv);

const file_to_exec = shelljs.pwd() + "\\index.js";

const askConfig = async () => {
  if (invalidConfig())
    console.log("Invalid configuration, check your connection information");
  const response = await prompt([
    {
      type: "input",
      name: "host",
      message: "FTP Hostname (IP Address or domain, like ftp.domain.com)",
    },
    {
      type: "input",
      name: "username",
      message: "FTP Username",
    },
    {
      type: "input",
      name: "password",
      message: "FTP Password",
    },
    {
      type: "select",
      name: "secure",
      message: "SFTP or FTP?",
      choices: ["SFTP", "FTP"],
    },
    {
      type: "input",
      name: "source",
      message: "Source Directory full path (use '/' as directory separator)",
    },
    {
      type: "input",
      name: "backup",
      message: "Backup Directory full path (use '/' as directory separator)",
    },
  ]);
  const secure = response.secure === "SFTP";
  writeFile(
    "config.js",
    `
export const config = {
  host: "${response.host}",
  username: "${response.username}",
  password: "${response.password}",
  secure: ${secure},
  source: "${response.source}", // absolute source path
  backup: "${response.backup}", // absolute backup path
};`,
    "utf8",
    () => console.log("Created config.js file")
  );
};

const send_files = async () => {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: config.host,
      user: config.username,
      password: config.password,
      secure: config.secure === "SFTP",
    });
    await client.uploadFromDir(config.source);
  } catch (err) {
    console.log(err);
  }
  client.close();
};

const invalidConfig = () => {
  return (
    config.host === "" ||
    config.username === "" ||
    config.password === "" ||
    config.source === "" ||
    config.backup === ""
  );
};

const startWatch = () => {
  console.log("Started...");
  watch(config.source, async () => {
    await setTimeout(async () => {
      await send_files();
      await fs.copy(config.source, config.backup);
      await fs.emptyDir(config.source);
    }, 3000);
  });
};

const main = async () => {
  if (args.install_service) {
    exec(
      `qckwinsvc --name "ftp-transfer-watcher" --description "Sync your files to FTP" --script "${file_to_exec}" --startImmediately`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(stdout);
      }
    );
    return;
  }
  if (args.uninstall_service) {
    exec(
      `qckwinsvc --uninstall --name "ftp-transfer-watcher" --description "Sync your files to FTP" --script "${file_to_exec}" --startImmediately`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(stdout);
      }
    );
    return;
  }
  if (args.config || invalidConfig()) {
    await askConfig();
  }
  if (args.watch) startWatch();
};

main();
