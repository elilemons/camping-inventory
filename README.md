# Camping Inventory

Camping Inventory is a Bun-managed Turborepo containing the shared Next.js product interface, its Capacitor iOS and Android shells, the Payload backend, and supporting packages.

## Applications and packages

- `apps/web`: browser application and Capacitor source; native platforms are generated under `apps/web/ios` and `apps/web/android`.
- `apps/payload`: Payload admin application and API.
- `apps/docs`: repository documentation application.
- `packages/ui`: shared React components.
- `packages/payload-config`: shared Payload configuration and generated types.

## Development

Install dependencies and run the available checks with Bun:

```sh
bun install
bun run dev:web
bun run check-types
bun run lint
```

Build the shared web application and its static Capacitor assets:

```sh
bun run --filter web build
bun run --filter web cap:sync
```

The web application reads `NEXT_PUBLIC_API_URL` at build time and defaults to `http://localhost:3000/api`. Native builds must use a Payload URL reachable from the device. Capacitor identifies the application as `com.elilemons.campinginventory`.

Payload remains a separate backend and is never bundled into the native application.
