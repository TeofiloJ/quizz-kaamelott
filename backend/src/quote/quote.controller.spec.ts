import { QuoteController } from "./quote.controller";
import { QuoteService } from "./quote.service";
import { Test, TestingModule } from "@nestjs/testing";
import { MongooseModule } from "@nestjs/mongoose";
import { QuoteSchema } from "./quote.schema";
import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';
import { QuoteModule } from "./quote.module";
var mongoose = require('mongoose')
const FactoryGirl = require('factory-girl');
const factory = FactoryGirl.factory;
describe('QuoteController',  () => {
  
  var Quote = mongoose.model('Quote',QuoteSchema)
   factory.define('Quote', Quote, {
    id: factory.sequence('id', (n) => n),
    text:  factory.chance('sentence'),
    actor:  factory.chance('name'),
    author:  factory.chance('name'),
    season:  factory.sequence('season', (n) => `season_${n}`),
    episode:  factory.sequence('episode', (n) => `episode${n}`),
    character:   factory.chance('name'),
  });

    let app: INestApplication;
    let quoteService;
    beforeAll(async() => {
      const quote = await factory.build('Quote').then( quoteGenerate =>{
        return {
          "data": [
            {
              "type": "quotes",
              "id": quoteGenerate.id,
              "attributes": {
                "character": quoteGenerate.character,
                "text": quoteGenerate.text,
                "actor": quoteGenerate.actor,
                "author": quoteGenerate.author,
                "season": quoteGenerate.season,
                "episode": quoteGenerate.episode
              }
            }
          ]
        }
      })
      quoteService = { findAll: () => quote };
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
    
    it('should be true', () => {
        expect(true).toBe(true);
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
  


