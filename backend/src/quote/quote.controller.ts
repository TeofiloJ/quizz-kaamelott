import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { Quote } from "./quote.interface";
import { QuoteService } from "./quote.service";
import { QuoteCreateDto } from "./quote.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller('quotes')
@ApiTags('quotes')
export class QuoteController {
    constructor(private readonly quoteService: QuoteService){}
    
    // @Get()
    // async findAll(): Promise<Quote[]>{
    // return this.quoteService.findAll();
    // }

    @Get()
    async findAll(@Query() query): Promise<Quote[]>{
        return this.quoteService.findAll(query);
    }

    @Post()
    async create(@Body()  dto : QuoteCreateDto){
        return this.quoteService.create(dto)
    }
    }