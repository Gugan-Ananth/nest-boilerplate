import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export function signupTest(getApp: () => INestApplication) {
    describe('/auth/signup (POST)', () => {
        it('should successfully create a new user', async () => {
          const app = getApp();
          const signupPayload = { 
            firstName: 'Person', 
            lastName: 'A', 
            role: 'CUSTOMER', 
            email: 'person@gmail.com', 
            password: 'Password@123' 
          };
          
          const response = await request(app.getHttpServer())
            .post('/auth/signup')
            .send(signupPayload)
            .expect(201);
          
          expect(response.body).toHaveProperty('id');
          expect(response.body.email).toBe(signupPayload.email);
        });
    
        it('should fail if email is already taken (Real Logic)', async () => {
          const app = getApp();
          const signUpPayload = { 
            firstName: 'Person',
            lastName: 'B',
            role: 'CUSTOMER',
            email: 'person2@gmail.com', 
            password: 'password123' 
          };
          
          await request(app.getHttpServer())
            .post('/auth/signup')
            .send(signUpPayload);
          
          return request(app.getHttpServer())
            .post('/auth/signup')
            .send(signUpPayload)
            .expect(409);
        });
      });
}