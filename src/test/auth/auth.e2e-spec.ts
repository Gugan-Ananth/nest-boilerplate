import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { signupTest } from './signup';
import { loginTest } from './login';
import { AppTestModule } from '../test.module';

describe('AuthController (e2e) - Real Service', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppTestModule]
    }).compile();
  
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  signupTest(() => app);
  loginTest(() => app);
});