import { QuoteController } from "./quote.controller";
import { QuoteService } from "./quote.service";
import { Test, TestingModule } from "@nestjs/testing";
import { MongooseModule } from "@nestjs/mongoose";
import { QuoteSchema } from "./quote.schema";
import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';

describe('QuoteController', () => {
  const quote = {
    "data": [
      {
        "type": "quotes",
        "id": "1",
        "attributes": {
          "character": "string",
          "text": "string",
          "actor": "string",
          "author": "string",
          "season": "string",
          "episode": "string"
        }
      }
    ]
  }
  const quoteService = { findAll: () => quote };

  let app: INestApplication;

  beforeAll(async() => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [
        QuoteController
      ],
      providers: [QuoteService],
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/quote'),
        MongooseModule.forFeature([{ name: 'quote', schema: QuoteSchema }])
      ]
    
    })  
    .overrideProvider(QuoteService)
    .useValue(quoteService)
    .compile();
  
    app = moduleRef.createNestApplication();
    await app.init();
  });
    
  it(`/GET quotes`, () => {
      return request(app.getHttpServer())
        .get('/quotes')
        .expect(200)
        .expect(quoteService.findAll());

  });
    
  afterAll(async () => {
    await app.close();
  });

});
  


