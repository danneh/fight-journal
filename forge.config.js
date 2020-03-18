const path = require('path')

const osTerminal = process.platform === 'win32' ? 'cmd' : 'bash';
module.exports = {
	"packagerConfig": {
		"asar": true,
	},
	"makers": [
		{
			"name": "@electron-forge/maker-squirrel",
			"config": {
				"iconUrl": path.join(__dirname, 'src', 'sfvce_icon.ico'),
				"setupIcon": path.join(__dirname, 'src', 'sfvce_icon.ico'),
			},
		},
		{
			"name": '@electron-forge/maker-dmg',
			"config": {
				"background": path.join(__dirname, 'src', 'img', 'bg-ryu-chunli.jpg'),
				"format": 'ULFO'
			},
		},
		{
			"name": "@electron-forge/maker-zip",
			"platforms": [
				"darwin",
			],
		},
		{
			"name": "@electron-forge/maker-deb",
			"config": {},
		},
		{
			"name": "@electron-forge/maker-rpm",
			"config": {},
		},
	],
	"publishers": [
		{
			name: '@electron-forge/publisher-github',
			config: {
				repository: {
					owner: 'me',
					name: 'fight-journal',
				},
				prerelease: true,
			},
		},
	],
	hooks: {
		postStart: async () => {
			if (process.env.npm_lifecycle_event === 'start') {
				terminal = require('child_process').spawn(osTerminal)
				setTimeout(() => {
					terminal.stdin.write('npm run mix-watch\n')
					terminal.stdin.end()
				}, 1000)

				terminal.stdout.on('data', data => {
					console.log(`${data}`)
				})

				terminal.stderr.on('data', data => {
					// console.log(`Error: ${data}`)
				})

				terminal.on('close', code => {
					console.log(`child process exited with code ${code}`)
				})
			}
			return true
		},
		generateAssets: async () => {
			if (process.env.npm_lifecycle_event === 'make') {
				terminal = require('child_process').spawn(osTerminal)
				setTimeout(function () {
					terminal.stdin.write('npm run mix-build\n')
					terminal.stdin.end()
					// return true
				}, 1000)

				terminal.stdout.on('data', data => {
					console.log(`${data}`)
				})

				terminal.stderr.on('data', data => {
					// console.log(`${data}`)
				})

				terminal.on('close', code => {
					console.log(`child process exited with code ${code}`)
				})
			}
		}
	}
}