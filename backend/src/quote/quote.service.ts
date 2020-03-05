import { Injectable, Inject } from "@nestjs/common";
import { Quote } from "./quote.interface";
import { QuoteCreateDto } from "./quote.dto";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class QuoteService{
    constructor(
        @InjectModel('quote') private readonly quoteModel: Model<Quote>) {}

    async create(dto: QuoteCreateDto): Promise<Quote> {
        const createdQuote = new this.quoteModel(dto);
        return createdQuote.save();
      }
    
      async findAll(): Promise<Quote[]> {
        return this.quoteModel.find().exec();
      }
}