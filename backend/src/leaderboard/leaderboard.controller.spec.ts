
import { LeaderboardController } from "./leaderboard.controller";
import { LeaderboardService } from "./leaderboard.service";
import { Test, TestingModule } from "@nestjs/testing";
import { MongooseModule } from "@nestjs/mongoose";
import { LeaderboardSchema } from "./leaderboard.schema";
import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';

var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

const DB_URL = 'mongodb://localhost:27017/kaamelott-test';
const COLLECTION = 'leaderboards'

function cleaData(){
    mongoose.connect(DB_URL);
    var conn = mongoose.connection;
    conn.collection(COLLECTION).remove({})
}

function insertData(){

    mongoose.connect(DB_URL);
    var conn = mongoose.connection;
    var leaderboard = {
        id: new ObjectID(),
        "name": "foobar",
        "score": "383" 
    };
    conn.collection(COLLECTION).insert(leaderboard);
}

describe('LeaderboardController', () => {

    let app: INestApplication;

    beforeAll(async() => {
        insertData()
            const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [
                LeaderboardController
            ],
            providers: [LeaderboardService],
            imports: [
                MongooseModule.forRoot(DB_URL),
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
                    expect(res.body.data.length > 0).toBe(true)
                }
            );
    });

    it(`/GET leaderboards top ten score`, () => {
        return request(app.getHttpServer())
            .get('/leaderboards')
            .expect(200)
            .expect(
                res => {
                    expect(res.body.data.length > 0).toBe(true)
                }
            );
    });

    it(`/GET return a score from id `, async () => {
        let scoreId = await request(app.getHttpServer())
            .post('/leaderboards')
            .send({
                name: 'John Doe',
                score: 18
            }).then(res =>{
                return res.body.id
            })
        return request(app.getHttpServer())
            .get('/leaderboards/' + scoreId)
            .expect(200)
            .expect(
                res => {
                    expect(res.body.data.attributes.id).toBe(scoreId)
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
        cleaData()
        await app.close();
    });

});

  


