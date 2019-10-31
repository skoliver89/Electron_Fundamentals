const electron = require("electron");

const ipc = electron.ipcRenderer;

document.getElementById("start").addEventListener("click", _ => {
  ipc.send("countdown-start");
});

ipc.on("countdown", (evt, count) => {
  const startBtn = document.getElementById("start");
  document.getElementById("count").innerHTML = count;
  if (!isNaN(count)) {
    startBtn.innerText = "Running";
    startBtn.disabled = true;
  } else {
    startBtn.innerText = "Start";
    startBtn.disabled = false;
  }
});
