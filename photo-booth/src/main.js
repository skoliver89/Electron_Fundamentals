const electron = require("electron");
const { app, BrowserWindow, ipcMain: ipc, Menu } = electron;

const images = require("./images");
const menuTemplate = require("./menu");

let mainWindow = null;
app.on("ready", _ => {
  mainWindow = new BrowserWindow({
    width: 893,
    height: 725,
    resizable: false,
    webPreferences: { nodeIntegration: true }
  });

  mainWindow.loadURL(`file://${__dirname}/capture.html`);

  images.mkdir(images.getPicturesDir(app));

  mainWindow.on("close", _ => {
    mainWindow = null;
  });

  const menuContents = Menu.buildFromTemplate(menuTemplate(mainWindow, app));
  Menu.setApplicationMenu(menuContents);
});

ipc.on("image-captured", (evt, contents) => {
  images.save(images.getPicturesDir(app), contents, (err, imgPath) => {
    images.cache(imgPath);
  });
});

ipc.on("image-remove", (evt, index) => {
  images.mkdir(index, _ => {
    evt.sender.send("image-removed", index);
  });
});
