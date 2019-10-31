const fs = require("fs");
const path = require("path");
const shell = require("electron").shell;
const spawn = require("child_process").spawn;
const toast = require("./toast");

const openCmds = {
  darwin: "open",
  win32: "explorer",
  linux: "nautilus"
};

let images = [];

exports.save = (dir, contents, done) => {
  const base64Data = contents.replace(/^data:image\/png;base64,/, "");
  const imgPath = getFullPath(dir);
  fs.writeFile(imgPath, base64Data, { encoding: "base64" }, err => {
    if (err) return logError(err);
    done(null, imgPath);
  });
};

exports.getPicturesDir = app => {
  return path.join(app.getPath("pictures"), "photo-booth");
};

exports.mkdir = dir => {
  fs.stat(dir, (err, stats) => {
    if (err && err.code !== "ENOENT") return logError(err);
    else if (err || !stats.isDirectory()) fs.mkdir(dir, logError);
  });
};

exports.rm = (index, done) => {
  fs.unlink(images[index], err => {
    if (err) return logError(err);

    images.splice(index, 1);
    done();
  });
};

exports.cache = imgPath => {
  images.push(imgPath);
};

exports.getFromCache = index => {
  return images[index];
};

exports.openDir = dirPath => {
  const cmd = openCmds[process.platform];
  if (cmd) spawn(cmd, [dirPath]);
  else shell.showItemInFolder(dirPath);
};

function getFullPath(basePath) {
  const now = new Date();
  const fileName =
    now.getFullYear().toString() +
    now.getMonth().toString() +
    now.getDate().toString() +
    now.getHours().toString() +
    now.getMinutes().toString() +
    now.getSeconds().toString() +
    now.getMilliseconds().toString();

  return path.join(basePath, fileName + ".png");
}

function logError(err) {
  return err && toast.doToast("Image Error", err.message, "error");
}
