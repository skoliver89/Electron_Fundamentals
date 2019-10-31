const electron = require("electron");
const { screen } = require("electron").remote;
const fs = require("fs");
const path = require("path");

const { desktopCapturer, ipcRenderer: ipc } = electron;

function onCapture(evt, targetDir) {
  getMainSource(desktopCapturer, screen, source => {
    const png = source.thumbnail.toPNG();
    const now = new Date();
    const fileName =
      now.getFullYear().toString() +
      now.getMonth().toString() +
      now.getDate().toString() +
      now.getHours().toString() +
      now.getMinutes().toString() +
      now.getSeconds().toString() +
      now.getMilliseconds().toString();

    const filePath = path.join(targetDir, fileName + ".png");

    writeScreenshot(png, filePath);
  });
}

function getMainSource(desktopCapturer, screen, done) {
  const options = {
    types: ["screen"],
    thumbnailSize: screen.getPrimaryDisplay().workAreaSize
  };
  desktopCapturer.getSources(options, (err, sources) => {
    if (err) return console.log("Cannot capture screen: ", err);

    const isMainSource = source =>
      source.name === "Entire Screen" || source.name === "Screen 1";
    done(sources.filter(isMainSource)[0]);
  });
}

function writeScreenshot(png, filePath) {
  fs.writeFile(filePath, png, err => {
    if (err) return console.log("Failed to write screen:", err);
  });
}

ipc.on("capture", onCapture);
