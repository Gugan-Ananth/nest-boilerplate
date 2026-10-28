import { INestApplication } from "@nestjs/common";
import request from 'supertest';

export function forgotPasswordTest (getApp: () => INestApplication, getAccessToken: () => string){
    describe('PATCH /users/change-password', () => {
        it('should change password when authenticated', async () => {
          const app = getApp();
          const accessToken = getAccessToken();
          const response = await request(app.getHttpServer())
            .patch(`/users/change-password`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
              oldPassword: 'Test@1234',
              newPassword: 'NewPassword@123',
            });
    
          expect(response.status).toBe(200);
          expect(response.body.message).toBeDefined();
        });
    
        it('should fail if old password is incorrect', async () => {
            const app = getApp();
            const accessToken = getAccessToken();
          const response = await request(app.getHttpServer())
            .patch(`/users/change-password`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
              oldPassword: 'WrongPassword',
              newPassword: 'AnotherPassword@123',
            });
    
          expect(response.status).toBe(401);
        });
    
        it('should fail if not authenticated', async () => {
          const app = getApp();
          const response = await request(app.getHttpServer())
            .patch(`/users/change-password`)
            .send({
              oldPassword: 'Password@123',
              newPassword: 'NewPassword@123',
            });
    
          expect(response.status).toBe(401);
        });
    
        it('should fail validation if body is missing fields', async () => {
            const app = getApp();
            const accessToken = getAccessToken();
          const response = await request(app.getHttpServer())
            .patch(`/users/change-password`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
              newPassword: 'OnlyOneField',
            });
    
          expect(response.status).toBe(400);
        });
      });
}