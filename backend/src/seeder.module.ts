import { Module } from "@nestjs/common";
import { QuoteModule } from "./quote/quote.module";
import { Logger, } from "@nestjs/common";
import { Seeder } from "./seeder";
import { MongooseModule } from "@nestjs/mongoose";


@Module({
    imports:[MongooseModule.forRoot('mongodb://localhost/quotes'),QuoteModule],
    providers:[Logger, Seeder],
})
export class SeederModule {}