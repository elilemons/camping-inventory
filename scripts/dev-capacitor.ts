const target = Bun.argv[2] || 'android'

if (!['android', 'ios'].includes(target)) {
  throw new Error('Usage: bun run dev:capacitor [android|ios]')
}

const ip = await (async () => {
  for (const interfaceName of ['en0', 'en1']) {
    const result = Bun.spawnSync(['ipconfig', 'getifaddr', interfaceName])
    const address = result.stdout.toString().trim()
    if (result.exitCode === 0 && address) return address
  }

  throw new Error('Could not determine the LAN IP. Set CAPACITOR_DEV_HOST and retry.')
})()

const host = process.env.CAPACITOR_DEV_HOST || ip
const root = new URL('..', import.meta.url).pathname
const payloadDirectory = `${root}apps/payload`
const webDirectory = `${root}apps/web`
const bundledJdk = '/Applications/Android Studio.app/Contents/jbr/Contents/Home'
const environment = {
  ...process.env,
  ...(await Bun.file(`${bundledJdk}/bin/java`).exists()
    ? { JAVA_HOME: process.env.CAPACITOR_JAVA_HOME || bundledJdk }
    : {}),
  NEXT_ALLOWED_DEV_ORIGIN: host,
  NEXT_PUBLIC_API_URL: `http://${host}:3000/api`,
}

const payload = Bun.spawn(['bun', 'run', 'dev', '--', '--hostname', '0.0.0.0'], {
  cwd: payloadDirectory,
  env: process.env,
  stdout: 'inherit',
  stderr: 'inherit',
})

const web = Bun.spawn(['bun', 'run', 'dev', '--', '--hostname', '0.0.0.0'], {
  cwd: webDirectory,
  env: environment,
  stdout: 'inherit',
  stderr: 'inherit',
})

const cleanup = () => {
  payload.kill()
  web.kill()
}

process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)

await Bun.sleep(3000)

const capacitor = Bun.spawn(
  ['./node_modules/.bin/cap', 'run', target, '--live-reload', '--host', host, '--port', '3001'],
  {
    cwd: webDirectory,
    stdin: 'inherit',
    stdout: 'inherit',
    stderr: 'inherit',
  },
)

const exitCode = await capacitor.exited
cleanup()
process.exit(exitCode)
