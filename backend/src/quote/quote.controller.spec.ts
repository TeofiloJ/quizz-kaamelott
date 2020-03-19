import { QuoteController } from "./quote.controller";
import { QuoteService } from "./quote.service";
import { Test, TestingModule } from "@nestjs/testing";
import { MongooseModule } from "@nestjs/mongoose";
import { QuoteSchema } from "./quote.schema";
import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';

var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

const FactoryGirl = require('factory-girl');
const factory = FactoryGirl.factory;

const DB_URL = 'mongodb://localhost:27017/kaamelott-test';
const COLLECTION = 'quotes'

var Quote = mongoose.model('Quote', QuoteSchema)
factory.define('Quote', Quote, {
  id: new ObjectID(),
  text: factory.chance('sentence'),
  actor: factory.chance('name'),
  author: factory.chance('name'),
  season: factory.sequence('season', (n) => `Livre ${n}`),
  episode: factory.sequence('episode', (n) => `episode${n}`),
  character: factory.chance('name'),
});

function cleaData() {
  mongoose.connect(DB_URL);
  var conn = mongoose.connection;
  conn.collection(COLLECTION).remove({})
}

async function insertData() {
  mongoose.connect(DB_URL);
  var conn = mongoose.connection;
  const quote = await factory.build('Quote').then(quoteGenerate => {
    return {
      "id": quoteGenerate.id,
      "character": quoteGenerate.character,
      "text": quoteGenerate.text,
      "actor": quoteGenerate.actor,
      "author": quoteGenerate.author,
      "season": quoteGenerate.season,
      "episode": quoteGenerate.episode
    }
  })
  conn.collection(COLLECTION).insert(quote);
}

describe('QuoteController', () => {

  let app: INestApplication;

  beforeAll(async () => {
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

  it(`/POST quotes`, async () => {
    const quote = await factory.build('Quote').then(quoteGenerate => {
      return {
        "id": quoteGenerate.id,
        "character": quoteGenerate.character,
        "text": quoteGenerate.text,
        "actor": quoteGenerate.actor,
        "author": quoteGenerate.author,
        "season": quoteGenerate.season,
        "episode": quoteGenerate.episode
      }
    })
    return request(app.getHttpServer())
      .post('/quotes')
      .send(quote)
      .expect(201)
      .expect(
        res => {
          expect(res.body.id).toBe(quote.id)
        }
      );
  });

  it(`/GET quotes filter`, () => {
    var filter = { filter: {
      season: "Livre 1"
    }}
    return request(app.getHttpServer())
      .get('/quotes?filter%5Bseasons%5D=Livre%201')
      .send(filter)
      .expect(200)
      .expect(
        res => {
          expect(res.body.data[0].attributes.season).toBe("Livre 1")
        }
      );
  });

  afterAll(async () => {
    cleaData()
    await app.close();
  });

});



