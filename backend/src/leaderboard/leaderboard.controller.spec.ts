
import { LeaderboardController } from "./leaderboard.controller";
import { LeaderboardService } from "./leaderboard.service";
import { Test, TestingModule } from "@nestjs/testing";
import { MongooseModule } from "@nestjs/mongoose";
import { LeaderboardSchema } from "./leaderboard.schema";
import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';

describe('LeaderboardController', () => {

    let app: INestApplication;

    beforeAll(async() => {
        const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [
            LeaderboardController
        ],
        providers: [LeaderboardService],
        imports: [
            MongooseModule.forRoot('mongodb://localhost:27017/kaamelott-test'),
            MongooseModule.forFeature([{ name: 'leaderboard', schema: LeaderboardSchema }])
        ]
        
        })  
        .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });    

    it(`/GET leaderboards`, () => {
        return request(app.getHttpServer())
            .get('/leaderboards')
            .expect(200)
            .expect(
                res => {
                    expect(res.body.data.length == 2).toBe(true)
                }
            );
    });

    it(`/GET leaderboards top ten score`, () => {
        return request(app.getHttpServer())
            .get('/leaderboards')
            .expect(200)
            .expect(
                res => {
                    expect(res.body.data.length == 2).toBe(true)
                }
            );
    });

    it(`/POST leaderboards`, () => {
        return request(app.getHttpServer())
            .post('/leaderboards')
            .send({
                name: 'John Doe',
                score: 18
            })
            .expect(201)
            .expect(
                res => {
                    expect(res.body.name).toBe("John Doe")
                }
            );
    });
        
    afterAll(async () => {
        await app.close();
    });

});

  


