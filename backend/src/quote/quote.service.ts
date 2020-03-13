import { Injectable, Inject } from "@nestjs/common";
import { Quote } from "./quote.interface";
import { QuoteCreateDto } from "./quote.dto";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { quotes } from "./quote.data";
var JSONAPISerializer = require('jsonapi-serializer').Serializer;

@Injectable()
export class QuoteService{
  
    constructor(
        @InjectModel('quote') private readonly quoteModel: Model<Quote>) {}

      async create(dto: QuoteCreateDto): Promise<Quote> {
        const createdQuote = new this.quoteModel(dto);
        return createdQuote.save();
      }
    
      async findAll(): Promise<any> {
        var quotesSerializer = new JSONAPISerializer('quotes', {
          attributes: ['character', 'text','actor','author','season','episode','character']
        });
        const db =  this.quoteModel.find({},{'_id':0,'__v':0}).exec();
        return db.then( result => { return  quotesSerializer.serialize(result)
        })
        
      }
      createSeeder(): Array<Promise<any>>{
          return quotes.map(async (resultQuote:Quote)=>{
              return await this.quoteModel.findOne(
                  {text: resultQuote.text}
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