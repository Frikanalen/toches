# toches

This is the new Frikanalen API which will finally replace Django.

It is not yet in production.

## Dev environment

The following guide assumes a recent-ish Node, yarn, docker and docker compose.

```bash
# Use development database and trivial API key
cp dev-env .env
# install dependencies
yarn install
# bring up dev database
docker-compose up -d
# database migration
yarn knex migrate:latest
# transpile the command-line utilities
yarn build-cli
# create admin user (user: dev-admin@frikanalen.no password: dev-admin)
yarn cli create-test-users admin
# create mock data
yarn cli create-mock-data users 20
yarn cli create-mock-data orgs 20
# run in development mode at :8080
yarn run dev
```

### Proxy
In dev mode, toches will proxy requests coming in on /api/videos/upload to localhost:1080.
In production mode, this is handled by our traefik ingress controller.

## Unit tests

```bash
yarn test
```
