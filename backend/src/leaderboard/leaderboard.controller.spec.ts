
import { LeaderboardController } from "./leaderboard.controller";
import { LeaderboardService } from "./leaderboard.service";
import { Test, TestingModule } from "@nestjs/testing";
import { MongooseModule } from "@nestjs/mongoose";
import { LeaderboardSchema } from "./leaderboard.schema";
import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';

describe('LeaderboardController', () => {

    const leaderboardDto = {
        "name": "Foo Bar",
        "score": "683"
    }

    const leaderboard = {
        "data": [
        {
            "type": "leaderboards",
            "id": "1",
            "attributes": {
            "name": "Foo Bar",
            "score": "683",
            }
        }
        ]    
    }

    const leaderboardOrdered = {
        "data": [
        {
            "type": "leaderboards",
            "id": "1",
            "attributes": {
            "name": "Foo Bar",
            "score": "1366",
            }
        },
        {
            "type": "leaderboards",
            "id": "1",
            "attributes": {
            "name": "Foo Bar",
            "score": "683",
            }
        }
        ]    
    }

    const leaderboardService = { 
        create: () => leaderboard,
        findAll: () => leaderboard,
        findTopTen:() => leaderboardOrdered
    };

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

    it(`/GET leaderboards`, () => {
        return request(app.getHttpServer())
            .get('/leaderboards')
            .expect(200)
            .expect(leaderboardService.findAll());
    });

    it(`/GET leaderboards topTen`, () => {
        return request(app.getHttpServer())
            .get('/leaderboards/topTen')
            .expect(200)
            .expect(leaderboardService.findTopTen());
    });

    it(`/POST leaderboards`, () => {
        return request(app.getHttpServer())
            .post('/leaderboards')
            .expect(200)
            .expect(leaderboard);
    });
        
    afterAll(async () => {
        await app.close();
    });

});

  


