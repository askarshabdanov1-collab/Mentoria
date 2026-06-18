import { spawn } from 'node:child_process'

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'

const processes = [
  spawn(process.execPath, ['server/index.mjs'], { stdio: 'inherit', shell: false }),
  spawn(npmCommand, ['run', 'dev:client', '--', '--host', '127.0.0.1', '--port', '5173'], {
    stdio: 'inherit',
    shell: false,
  }),
]

function shutdown(signal) {
  for (const child of processes) child.kill(signal)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
