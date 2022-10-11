import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('hello jest', () => {
    test('two plus two is four', () => {
      expect(2 + 2).toBe(4);
    });
  });

  describe('/users', () => {
    test('/users (GET)', async () => {
      const res = await request(app.getHttpServer()).get('/users');
      expect(res.statusCode).toBe(401);
      //로그인을 안 한채로 요청 할 경우 401이 떠야된다
    });

    test('/users (POST)', async () => {
      const res = await request(app.getHttpServer()).post('/users').send({
        email: 'test@test.com',
        password: '1234',
        username: 'testName',
      });

      expect(res.statusCode).toBe(201);
    });

    test('/users/login (GET)', async () => {
      const res = await request(app.getHttpServer()).post('/users/login').send({
        email: 'test@test.com',
        password: '1234',
      });

      expect(res.statusCode).toBe(200);
    });
  });

  // test('/ (GET)', () => {
  //   return request(app.getHttpServer()).get('/').expect(200);
  // });
});
