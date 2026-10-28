import { INestApplication } from "@nestjs/common";
import request from 'supertest';

export function updateUsersTest (getApp: () => INestApplication, getUserID: () => string, getAccessToken: () => string){
    describe('PATCH /users/update', () => {
        it('should update user profile when authenticated', async () => {
          const app = getApp();
          const accessToken = getAccessToken();
          const userID = getUserID();
          const response = await request(app.getHttpServer())
            .patch(`/users/update`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
              firstName: 'Updated Name',
            });    
          expect(response.status).toBe(200);
          expect(response.body).toMatchObject({
            id: userID,
            firstName: 'Updated Name',
          });
        });
    
        it('should fail if not authenticated', async () => {
          const app = getApp();
          const response = await request(app.getHttpServer())
            .patch(`/users/update`)
            .send({
              name: 'No Auth',
            });
    
          expect(response.status).toBe(401);
        });
    
        it('should fail validation for invalid body', async () => {
          const app = getApp();
          const accessToken = getAccessToken();
          const response = await request(app.getHttpServer())
            .patch(`/users/update`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
              email: 'not-an-email',
            });
    
          expect(response.status).toBe(400);
        });
      });
}