const {app, BrowserWindow} = require("electron");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Spotify Media Importer",
    resizable: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  });

  win.loadURL(`file://${__dirname}/../dist/spotify-media-importer/index.html`);
  win.setMenu(null);
  win.on("closed", () => {
    win = null;
  });
}

app.whenReady().then(createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
