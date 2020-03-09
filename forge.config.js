const osTerminal = process.platform === 'win32' ? 'cmd' : 'bash';
module.exports = {
	"packagerConfig": {},
	"makers": [
		{
			"name": "@electron-forge/maker-squirrel",
			"config": {
				"name": "FightJournal",

			}
		},
		{
			"name": "@electron-forge/maker-zip",
			"platforms": [
				"darwin",
				"win32"
			]
		},
		{
			"name": "@electron-forge/maker-deb",
			"config": {}
		},
		{
			"name": "@electron-forge/maker-rpm",
			"config": {}
		}
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