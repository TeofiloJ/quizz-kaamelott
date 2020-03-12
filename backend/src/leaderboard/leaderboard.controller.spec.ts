
import { LeaderboardController } from "./leaderboard.controller";
import { LeaderboardService } from "./leaderboard.service";
import { Test, TestingModule } from "@nestjs/testing";
import { MongooseModule } from "@nestjs/mongoose";
import { LeaderboardSchema } from "./leaderboard.schema";
import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';
import { LeaderboardModule } from "./leaderboard.module";




describe('LeaderboardController', () => {
  const leaderboard = {
    "data": [
      {
        "type": "leaderboards",
        "id": "1",
        "attributes": {
          "name": "string",
          "score": "number",
        }
      }
    ]
  }
 

const leaderboardService = { findAll: () => leaderboard };

    let app: INestApplication;
    beforeAll(async() => {
      const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [
          LeaderboardController
        ],
        providers: [LeaderboardService],
        imports: [
          MongooseModule.forRoot('mongodb://localhost:27017/leaderboard'),
          MongooseModule.forFeature([{ name: 'leaderboard', schema: LeaderboardSchema }])
        ]
      
      })  
      .overrideProvider(LeaderboardService)
      .useValue(leaderboardService)
      .compile();
   
      app = moduleRef.createNestApplication();
      await app.init();
    });
    
    it('should be true', () => {
        expect(true).toBe(true);
      });

  
    it(`/GET leaderboards`, () => {
        return request(app.getHttpServer())
          .get('/leaderboards')
          .expect(200)
          .expect(leaderboardService.findAll());

      });
      
       afterAll(async () => {
        await app.close();
      });
    });
  


