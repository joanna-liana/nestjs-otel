import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import jestOpenAPI from 'jest-openapi';
import { AppModule } from './../src/app.module';
import { join } from 'path';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  jestOpenAPI(join(__dirname, '../api.json'));

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /drafts', async () => {
    const res = await request(app.getHttpServer())
      .post('/drafts')
      .send({
        title: 'Test article ' + Date.now(),
        body: 'Some body',
      });

    expect(res.status).toEqual(201);
    expect(res).toSatisfyApiSpec();
  });

  it('POST /drafts/:draftId/publish', async () => {
    // given
    const createdDraftRes = await request(app.getHttpServer())
      .post('/drafts')
      .send({
        title: 'Test article ' + Date.now(),
        body: 'Some body',
      });

    //when
    const publishedDraftRes = await request(app.getHttpServer()).post(
      createdDraftRes.body._links.publish.href,
    );

    // then
    expect(publishedDraftRes.status).toEqual(201);
    expect(publishedDraftRes).toSatisfyApiSpec();
  });

  it('GET /articles/:articleId', async () => {
    // given
    const createdDraftRes = await request(app.getHttpServer())
      .post('/drafts')
      .send({
        title: 'Test article ' + Date.now(),
        body: 'Some body',
      });

    const publishedDraftRes = await request(app.getHttpServer()).post(
      createdDraftRes.body._links.publish.href,
    );

    // when
    const articleRes = await request(app.getHttpServer()).get(
      publishedDraftRes.body._links.self.href,
    );

    // then
    expect(articleRes.status).toEqual(200);
    expect(articleRes).toSatisfyApiSpec();
  });

  it('GET /articles/:articleId when trying to fetch a draft', async () => {
    // given
    const createdDraftRes = await request(app.getHttpServer())
      .post('/drafts')
      .send({
        title: 'Test article ' + Date.now(),
        body: 'Some body',
      });

    // when
    const articleRes = await request(app.getHttpServer()).get(
      `/articles/${createdDraftRes.body.data.id}`,
    );

    // then
    expect(articleRes.status).toEqual(404);
  });
});
