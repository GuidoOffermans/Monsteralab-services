[![CircleCI](https://dl.circleci.com/status-badge/img/gh/GuidoOffermans/Monsteralab-services/tree/circleci-project-setup.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/GuidoOffermans/Monsteralab-services/tree/circleci-project-setup)


### Migrations
Migrations are a bit more tricky since typeOrm 0.3 and up.

- generate a migration: `npx typeorm-ts-node-esm migration:generate ./src/migrations/add-user-table -d ./src/data-source.ts`
- run a migration: `npx typeorm migration:run -d ./src/data-source.ts`
