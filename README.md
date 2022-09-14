# toches

*toches* is a Yiddish word meaning back-end. This the new Frikanalen backend which will finally replace Django.

There is no automated rollout yet, but a recent-ish version is accessible under https://beta.frikanalen.no/api/v2.

There, we expose a GraphQL endpoint ([see playground](https://beta.frikanalen.no/graphql)) and an OpenAPI REST API ([see Swagger UI](https://beta.frikanalen.no/api/v2/swagger)).

We use [Koa](https://koajs.com/) as our framework, and we try to comply with the [twelve factors](https://12factor.net/).

Our database is PostgreSQL, which we query using the Knex builder.

## Dev environment

The following guide assumes a recent-ish Node, yarn, docker and docker compose.

```bash
# Use development database and trivial API key
cp dev-env .env
# install dependencies
yarn
# bring up dev database
docker-compose up -d
# initialize database
yarn knex migrate:latest
# run in development mode at :8080
yarn run dev
```

### Generating test data

```bash
# build the command-line utilities
yarn build-cli
# create admin user (user: dev-admin@frikanalen.no password: dev-admin)
yarn cli create-test-users admin
# create mock data
yarn cli create-mock-data users 20
yarn cli create-mock-data orgs 20
```

### Proxy

In dev mode, toches will proxy requests coming in on /api/videos/upload to localhost:1080.

In production mode, this is handled by our traefik ingress controller.

## Unit tests

```bash
yarn test
```
