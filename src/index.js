const { app, BrowserWindow, ipcMain } = require('electron');
const Store = require('electron-store');
const store = new Store();
const path = require('path')

if (process.platform === 'darwin') {
	app.commandLine.appendArgument("--enable-features=Metal"); // Fixes log issues with rendering.
	// app.dock.setIcon(path.join(__dirname, 'img', 'sfvce-logo.png')); // Sets icon on macOS
}
app.allowRendererProcessReuse = true; // https://github.com/electron/electron/issues/18397

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
	app.quit();
}
// if (process.platform !== 'darwin') {
// 	require('update-electron-app')();
// }

require('electron-reload')(__dirname, {
	electron: path.join(__dirname, '../', 'node_modules', '.bin', 'electron')
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		minWidth: 900,
		minHeight: 500,
		width: 1200,
		height: 715,
		titleBarStyle: 'hiddenInset',
		icon: path.join(__dirname, 'img', 'sfvce-logo.png'),
		webPreferences: {
			nodeIntegration: true
		}
	});
	mainWindow.removeMenu()

	// and load the index.html of the app.
	mainWindow.loadFile(path.join(__dirname, 'index.html'));

	// Open the DevTools.
	mainWindow.webContents.once('dom-ready', () => {
		app.isPackaged || mainWindow.webContents.openDevTools();
	})

	// Emitted when the window is closed.
	mainWindow.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {

	// Vuejs dev tools
	if (!app.isPackaged) {
		require('vue-devtools').install()
	}

	// Load the window
	createWindow()
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
// On OS X it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
if (process.platform !== 'darwin') {
	app.quit();
}
});

app.on('activate', () => {
// On OS X it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
if (mainWindow === null) {
	createWindow();
}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on('get-setting', (event, arg) => {
	event.returnValue = store.get(arg)
})
ipcMain.on('set-setting', (event, arg) => {
	store.set(arg.option, arg.value)
	event.returnValue = 'OK'
})
ipcMain.on('delete-setting', (event, arg) => {
	console.log('Deleting setting', arg.option);

	store.delete(arg.option)
	event.returnValue = 'OK'
})
ipcMain.on('get-store-path', (event) => {
	event.returnValue = store.path
})