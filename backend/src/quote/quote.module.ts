import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { QuoteSchema } from "./quote.schema";
import { QuoteController } from "./quote.controller";
import { QuoteService } from "./quote.service";

Module({
    imports: [MongooseModule.forFeature([{ name: 'quote', schema: QuoteSchema }])],
    controllers: [QuoteController],
    providers: [QuoteService],
    exports:[QuoteService]

})
export class QuoteModule{}