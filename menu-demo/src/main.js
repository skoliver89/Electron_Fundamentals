const electron = require("electron");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

let mainWindow;

app.on("ready", _ => {
  mainWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true }
  });

  const name = electron.app.getName();
  const template = [
    {
      label: name,
      submenu: [
        {
          label: `About ${name}`,
          click: _ => {
            console.log("clicked about");
          },
          role: "about" //OSX Only!
        },
        {
          type: "separator"
        },
        {
          label: "Quit",
          click: _ => {
            app.quit();
          },
          accelerator: "CommandOrControl+Q"
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.on("closed", _ => {
    mainWindow = null;
  });
});
