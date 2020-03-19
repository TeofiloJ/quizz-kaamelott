
import { LeaderboardController } from "./leaderboard.controller";
import { LeaderboardService } from "./leaderboard.service";
import { Test, TestingModule } from "@nestjs/testing";
import { MongooseModule } from "@nestjs/mongoose";
import { LeaderboardSchema } from "./leaderboard.schema";
import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';

const FactoryGirl = require('factory-girl');
const factory = FactoryGirl.factory;

var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

const DB_URL = 'mongodb://localhost:27017/kaamelott-test';
const COLLECTION = 'leaderboards'

var Leaderboard = mongoose.model('Quote', LeaderboardSchema)
factory.define('Leaderboard', Leaderboard, {
  id: new ObjectID(),
  name: factory.chance('name'),
  score: 15,
});


function cleaData(){
    mongoose.connect(DB_URL);
    var conn = mongoose.connection;
    conn.collection(COLLECTION).remove({})
}

async function insertData(){

    mongoose.connect(DB_URL);
    var conn = mongoose.connection;
    const leaderboard = await factory.build('Leaderboard').then(scoreGenerate => {
        return {
            "id": scoreGenerate.id,
            "name": scoreGenerate.name,
            "score": scoreGenerate.score
        }
      })
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
                "data": {
                    "attributes": {
                        "name": 'John Doe',
                        "score": 18
                    },
                    "type": "leaderboards"
                }
            }).then(res =>{
                return res.body.data.attributes.id
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
    it(`/ return bad request score negative `, async () => {
        let scoreId = await request(app.getHttpServer())
            .post('/leaderboards')
            .send({
                "data": {
                    "attributes": {
                        "name": 'John Doe',
                        "score": -1
                    },
                    "type": "leaderboards"
                }
            }).expect(400)

    });

    it(`/POST leaderboards`, async () => {
        const leaderboard = await factory.build('Leaderboard').then(scoreGenerate => {
            return {
                "data": {
                    "attributes": {
                        "name": scoreGenerate.name,
                        "score": scoreGenerate.score
                    },
                    "type": "leaderboards"
                }
            }
          })
        return request(app.getHttpServer())
            .post('/leaderboards')
            .send(leaderboard)
            .expect(201)
            .expect(
                res => {
                    expect(res.body.name).toBe(leaderboard.name)
                }
            );
    });
        
    afterAll(async () => {
        cleaData()
        await app.close();
    });

});

  


