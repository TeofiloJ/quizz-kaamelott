import { Injectable, Inject } from "@nestjs/common";
import { Quote } from "./quote.interface";
import { QuoteCreateDto } from "./quote.dto";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
        console.log(db)
        return db.then( result => { return  quotesSerializer.serialize(result)
        })
        
      }
}