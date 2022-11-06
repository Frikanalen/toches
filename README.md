# toches

_toches_ is a Yiddish word meaning back-end. This the new Frikanalen backend which will finally replace Django.

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

## Production use notes

### Database migrations

At the moment database migrations are _not_ run automatically.

To migrate, rollout the newest version, attach to a shell in a container running the new version.

#### Example run

Terminal log from a successful rollout and database migration:

```
$ k rollout -n beta restart deployment toches
deployment.apps/toches restarted
$ k rollout -n beta status deployment toches
Waiting for deployment "toches" rollout to finish: 1 old replicas are pending termination...
Waiting for deployment "toches" rollout to finish: 1 old replicas are pending termination...
deployment "toches" successfully rolled out
$ k -n beta logs toches-5f67b6fdc6-zsx42
yarn run v1.22.19
$ node build/index.js
2022-11-05 23:44:07.317  INFO  [build/modules/core/middleware/sendOpenApiSpec.js:11  buildOAPI] Generating OpenAPI spec
2022-11-05 23:44:07.605  INFO  [build/modules/core/middleware/sendOpenApiSpec.js:103  buildOAPI] OpenAPI generation complete
2022-11-05 23:44:08.391  INFO  [build/index.js:12  main] Testing database connection...
2022-11-05 23:44:08.630  INFO  [build/index.js:14 Server.<anonymous>] App listening on port 80
^C
command terminated with exit code 126
$ k -n beta exec -ti toches-5f67b6fdc6-zsx42 -- sh
/ # yarn knex migrate:latest
yarn run v1.22.19
$ /node_modules/.bin/knex migrate:latest
Batch 3 run: 1 migrations
Done in 1.27s.

```
