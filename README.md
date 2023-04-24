# Median

A Medium clone using [this Prisma tutorial](https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0) as a starting point.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## TODO
Expose a HATEOAS REST API - inspired by [Julien Topçu's Crafting Domain-Driven Designed REST APIs talk](https://www.youtube.com/watch?v=x3Bf25altb4) and [repo](https://gitlab.com/crafts-records/columbiad-express)
- [ ] start with creating an aritcle draft - `POST /drafts` (include a `self` link)
- [ ] allow for publishing the draft if both title and description have content - `POST /drafts/:draftId/publish` (include a `self` link)
- [ ] fetch published articles - `GET /articles`
- [ ] fetch a selected published article - `GET /articles/:articleId`. Links:
  - [ ] self
  - [ ] stats - get the likes count and other metadata - `GET /articles/:articleId/stats`
  - [ ] like the article if it's not yours - `POST /articles/:articleId/likes`
  - [ ] unlike the article if it's already liked by you - `DELETE /articles/:articleId/likes`

Advanced features:
- [ ] create another revision of the article (draft) - `POST /articles/:articleId/nextVersion`
- [ ] fetch the revision if there is one `GET /articles/:articleId/nextVersion`
- [ ] replace the published article with the revision - `PUT /articles/:articleId`
