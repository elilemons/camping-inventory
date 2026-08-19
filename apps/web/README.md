# Camping Inventory web and Capacitor application

`apps/web` is the shared Next.js interface for browser and mobile use. Its production build is a static export consumed by Capacitor's iOS and Android projects.

## Browser development

```sh
bun run dev
```

Open `http://localhost:3001` in a browser. The web API uses `NEXT_PUBLIC_API_URL`, defaulting to `http://localhost:3000/api`.

## Capacitor development

The permanent application identifier is `com.elilemons.campinginventory`. Set `NEXT_PUBLIC_API_URL` to a Payload URL reachable from the device before building native assets.

```sh
bun run cap:add:ios
bun run cap:add:android
bun run cap:sync
bun run cap:open:ios
bun run cap:open:android
```

`cap:sync` builds the static web output into `out/` and synchronizes it into both native projects. The Payload application remains a separate backend and is not bundled into the native assets.
