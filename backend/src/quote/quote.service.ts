import { Injectable, Inject, Query } from "@nestjs/common";
import { Quote } from "./quote.interface";
import { QuoteCreateDto } from "./quote.dto";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { quotes } from "./quote.data";
var JSONAPISerializer = require('jsonapi-serializer').Serializer;

@Injectable()
export class QuoteService {

  constructor(
    @InjectModel('quote') private readonly quoteModel: Model<Quote>) { }

  async create(dto: QuoteCreateDto): Promise<Quote> {
    const createdQuote = new this.quoteModel(dto);
    return createdQuote.save();
  }

  async findAll(query): Promise<any> {
    var quotesSerializer = new JSONAPISerializer('quotes', {
      attributes: ['character', 'text', 'actor', 'author', 'season', 'episode', 'character']
    });
    let filter = {};

    if (query.filter != undefined && query.filter.season != null && query.filter.season != undefined) {
      let season = query.filter.season.split(",")

      let arr = []
      season.forEach(element => {
        arr.push({ season: element })
      });
      filter = { $or: arr }
    }



    const db = this.quoteModel.find(filter, { '_id': 0, '__v': 0 }).exec();

    return db.then((result) => {
      if (query.filter != undefined && query.filter.season != null && query.filter.season != undefined) {
        let min = 0
        let max = result.length - 1
        let ret = []
        let randIndexUsed = []
        for (let index = 0; index < 10; index++) {
          let randIndex
          do {
            randIndex = Math.floor(Math.random() * (max - min + 1)) + min
          } while (randIndexUsed.includes(randIndex));

          randIndexUsed.push(randIndex)
          ret.push(result[randIndex])
        }

        result = ret
      }

      return quotesSerializer.serialize(result)
    })

  }

  createSeeder(): Array<Promise<any>> {
    return quotes.map(async (resultQuote: Quote) => {
      return await this.quoteModel.findOne(
        { text: resultQuote.text }
      ).then(async dbQuote => {
        if (dbQuote) {

          return Promise.resolve(null)
        }
        return Promise.resolve(
          await this.create(resultQuote)

        ).catch(error => Promise.reject(error))
      })
    })
  }
}