# toches

This is the new Frikanalen API which will finally replace Django.

## Dev environment

```bash
yarn install
docker-compose up -d
export DATABASE_URL=postgres://postgres:fk@localhost/fk
yarn knex migrate:latest
yarn cli create-mock-data users 20
yarn cli create-mock-data orgs 20
yarn run dev
```
