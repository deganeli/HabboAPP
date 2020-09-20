const {app,  BrowserWindow,Menu} = require('electron');
const path = require('path')
var pjson = require('../package.json');
const openAboutWindow = require('about-window').default;
const client = require('discord-rich-presence')('757170678112714824');
const https = require('https');
const { dialog } = require('electron');
const { shell } = require('electron');
const request = require('request');
var iniciouApp = Date.now();
var entrarurl = "";
client.updatePresence({
	state: 'Jogando - HabboAPP',
	details: 'habbo.com.br',
	startTimestamp: iniciouApp,
	largeImageKey: 'habboimg',
	instance: true,
});
function updateDiscord(link){
	var pagina = link.replace(pjson.settings.url, '');
	if(pagina.includes("https://habbo.com.br")){
		client.updatePresence({
			state: 'Jogando - HabboAPP',
			details: 'habbo.com.br',
			startTimestamp: iniciouApp,
			largeImageKey: 'habboimg',
			largeImageText: 'habbo.com.br/discord',
			instance: true,
		});
	}  else if(pagina.includes("https://habbo.com.br/")){
		client.updatePresence({
			state: 'Jogando - HabboAPP',
			details: 'habbo.com.br',
			startTimestamp: iniciouApp,
			largeImageKey: 'habboimg',
			largeImageText: 'habbo.com.br/discord',
			instance: true,
		});
	}
 else {
		client.updatePresence({
			state: 'Jogando - HabboAPP',
			details: 'habbo.com.br',
			startTimestamp: iniciouApp,
			largeImageKey: 'habboimg',
			largeImageText: 'habbo.com.br/discord',
			instance: true,
		});
	}
}

if (require('electron-squirrel-startup')) {app.quit();}
switch (process.platform) {
	case 'win32':
	pluginName = 'pepflashplayer.dll'
	pluginVersion = '20.0.0.306'
	break
	case 'darwin':
	pluginName = 'PepperFlashPlayer.plugin'
	pluginVersion = '32.0.0.207'
	break
}
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))
app.commandLine.appendSwitch('ppapi-flash-version', pluginVersion)
	const createWindow = () => {
		mainWindow = new BrowserWindow({
			title: pjson.productName,
			webPreferences: {
				plugins: true,
				nodeIntegration: false
			},
			show: false,
			frame: pjson.settings.useFrame,
			backgroundColor: pjson.settings.backgroundColor,
		});
		mainWindow.loadURL(pjson.settings.url)
		function obtem_url(){
			try{
				let contents = mainWindow.webContents.getURL();
				updateDiscord(contents);
			} catch(Exception){

			}
		}setInterval(() => obtem_url(), 1000);
		function entrar_url(){
			if(entrarurl != null || entrarurl != ""){
				try{
					if(mainWindow.loadURL(entrarurl))
						entrarurl = "";
				} catch(Exception){

				}
			}		
		}setInterval(() => entrar_url(), 500);
		mainWindow.on('closed', () => {
			mainWindow = null;
		});
        mainWindow.maximize()
		mainWindow.show();
	};
		const template = [
	   
			{
				label: 'Menu do Site',
				role: 'help',
				submenu: [
				  {
					label: 'Página Inicial',
					click: async () => {
					  const { shell } = require('electron')
					  await shell.openExternal('https://habbo.com.br/me')
					}
				  },
				  {
					label: 'Notícias',
					click: async () => {
					  const { shell } = require('electron')
					  await shell.openExternal('https://habbo.com.br/article/')
					}
				  },
				  {
					label: 'Equipe ',
					click: async () => {
					  const { shell } = require('electron')
					  await shell.openExternal('https://habbo.com.br/community/staff')
					}
				  },
				  {
					label: 'Hall da Fama',
					click: async () => {
					  const { shell } = require('electron')
					  await shell.openExternal('https://habbo.com.br/community/halloffame')
					}
				  },
				  {
					label: 'Loja',
					click: async () => {
					  const { shell } = require('electron')
					  await shell.openExternal('https://habbo.com.br/store/vip')
					}
				  },  
				  {
					label: 'Discord',
					click: async () => {
					  const { shell } = require('electron')
					  await shell.openExternal('https://habbo.com.br/discord')
					}
				  }
				]
			  },
			{
		  label: 'Opções do Aplicativo',
		  submenu: [
			 {
				label: 'Recarregar',
				role: 'reload'
			 },
			 
			 {
				type: 'separator'
			 },
			 {
				label: 'Restaurar Zoom',
				role: 'resetzoom'
			 },
			 {
				label: 'Zoom +',
				role: 'zoomin'
			 },
			 {
				label: 'Zoom -',
				role: 'zoomout'
			 },
			 {
				type: 'separator'
			 },
			 {
				label: 'Tela Cheia',
				role: 'togglefullscreen'
			 }
		  ]
		},
		{
			label: 'Informações do Aplicativo',
			role: 'help',
			submenu: [
			  {
				label: 'Versão: 1.0',
				
			  },
			  {
				label: 'Desenvolvido por k4nary',
				click: async () => {
				  const { shell } = require('electron')
				  await shell.openExternal('https://k4nary.me')
				}
			  },
			  {
				type: 'separator'
			 },
			  {
				label: 'Verificar última versão',
				click: async () => {
				  const { shell } = require('electron')
				  await shell.openExternal('https://habbo.com.br/aplicativo')
				}
			  },
			  {
				label: 'Avaliar aplicativo',
				click: async () => {
				  const { shell } = require('electron')
				  await shell.openExternal('https://forms.gle/xZWMCn9PBUoeDRDE7')
				}
			  }	  
			]
		  },
		  {
			label: "Deslogar",
			click: () =>
			entrarurl="https://habbo.com.br/logout",
		}
	   
	]
	
	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)
app.on('ready', createWindow);
app.on('window-all-closed', () => {if (process.platform !== 'darwin') {app.quit();}});
app.on('activate', () => {if (mainWindow === null) {createWindow();}});