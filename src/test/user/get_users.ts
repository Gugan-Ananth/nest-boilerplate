import { INestApplication } from "@nestjs/common";
import request from "supertest";

export function getUsersTest(getApp: () => INestApplication, getAuthToken: () => string){
    describe('/users (GET)', () => {
        it('should return all users when authenticated', () => {
          const app = getApp();  
          const authToken = getAuthToken();
          return request(app.getHttpServer())
            .get('/users')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
            .expect((res) => {
              expect(Array.isArray(res.body)).toBe(true);
              expect(res.body.length).toBeGreaterThan(0);
              expect(res.body[0]).toHaveProperty('id');
              expect(res.body[0]).toHaveProperty('email');
              expect(res.body[0]).toHaveProperty('firstName');
              expect(res.body[0]).toHaveProperty('lastName');
              expect(res.body[0]).not.toHaveProperty('password');
            });
        });
    
        it('should return 401 when not authenticated', () => {
          const app = getApp();  
          return request(app.getHttpServer())
            .get('/users')
            .expect(401);
        });
    
        it('should return 401 with invalid token', () => {
          const app = getApp();  
          return request(app.getHttpServer())
            .get('/users')
            .set('Authorization', 'Bearer invalid-token')
            .expect(401);
        });
      });
}