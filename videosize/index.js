const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

var mainwindow;

app.on('ready', () => {
	mainwindow = new BrowserWindow({});
	mainwindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:submit', (event, path) => {
	ffmpeg.ffprobe(path, (err, metadata) => {
		//console.log('duration is: '+ metadata.format.duration);
		mainwindow.webContents.send(
			'video:metadata',
			metadata.format.duration
		);
	});
});