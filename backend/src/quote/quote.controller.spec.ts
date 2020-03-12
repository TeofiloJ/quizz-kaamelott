import { QuoteController } from "./quote.controller";
import { QuoteService } from "./quote.service";
import { Test, TestingModule } from "@nestjs/testing";
import { MongooseModule } from "@nestjs/mongoose";
import { QuoteSchema } from "./quote.schema";
import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';

describe('QuoteController', () => {

  let app: INestApplication;

  beforeAll(async() => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [
        QuoteController
      ],
      providers: [QuoteService],
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/kaamelott-test'),
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
        .post('/leaderboards')
        .send({
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
    await app.close();
  });

});
  


