import { QuoteController } from "./quote.controller";
import { QuoteService } from "./quote.service";
import { Test, TestingModule } from "@nestjs/testing";
import { MongooseModule } from "@nestjs/mongoose";
import { QuoteSchema } from "./quote.schema";
import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';

var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

const DB_URL = 'mongodb://localhost:27017/kaamelott-test';
const COLLECTION = 'quotes'

function cleaData(){
  mongoose.connect(DB_URL);
  var conn = mongoose.connection;
  conn.collection(COLLECTION).remove({})
}

function insertData(){
    mongoose.connect(DB_URL);
    var conn = mongoose.connection;
    var quote = {
      "id": new ObjectID(),
      "character": "Perceval",
      "text": "string",
      "actor": "string",
      "author": "string",
      "season": "string",
      "episode": "string"
    };
    conn.collection(COLLECTION).insert(quote);
}

describe('QuoteController', () => {

  let app: INestApplication;

  beforeAll(async() => {
    insertData()
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [
        QuoteController
      ],
      providers: [QuoteService],
      imports: [
        MongooseModule.forRoot(DB_URL),
        MongooseModule.forFeature([{ name: 'quote', schema: QuoteSchema }])
      ]
    
    })  
    .compile();
  
    app = moduleRef.createNestApplication();
    await app.init();
  });
    
  it(`/GET quotes`, () => {
      return request(app.getHttpServer())
        .get('/quotes')
        .expect(200)
        .expect(
          res => {
            expect(res.body.data.length > 0).toBe(true)
          }
      );

  });

  it(`/POST quotes`, () => {
    return request(app.getHttpServer())
        .post('/quotes')
        .send({
          "id": "1",
          "character": "Arthur",
          "text": "string",
          "actor": "string",
          "author": "string",
          "season": "string",
          "episode": "string"
        })
        .expect(201)
        .expect(
            res => {
                expect(res.body.character).toBe("Arthur")
            }
        );
});
    
  afterAll(async () => {
    cleaData()
    await app.close();
  });

});
  


