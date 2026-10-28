import { INestApplication } from "@nestjs/common";
import request from 'supertest';

export function loginTest(getApp: () => INestApplication){
    describe('/auth/login (POST)', () => {
        it('should return real JWT tokens for valid credentials', async () => {
          const app = getApp();
          const user = { 
            email: 'person@gmail.com', 
            password: 'Password@123' 
          };
          
          await request(app.getHttpServer())
            .post('/auth/signup')
            .send(user);
          
          const response = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: user.email, password: user.password })
            .expect(201);
          
          expect(response.body.authToken).toBeDefined();
          expect(typeof response.body.authToken).toBe('string');
        });
      });
}