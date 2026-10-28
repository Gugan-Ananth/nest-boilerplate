import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppTestModule } from '../test.module';
import { getUsersTest } from './get_users';
import { updateUsersTest } from './update_users';
import { forgotPasswordTest } from './forgot_password';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let userId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppTestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    const signUpResponse = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: 'testuser@example.com',
        password: 'Test@1234',
        firstName: 'Test',
        lastName: 'User',
        role: 'CUSTOMER',
      })
      .expect(201);

    authToken = signUpResponse.body.authToken;
    userId = signUpResponse.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  getUsersTest(() => app, () => authToken);
  updateUsersTest(() => app, () => userId, () => authToken);
  forgotPasswordTest(() => app, () => authToken);
});