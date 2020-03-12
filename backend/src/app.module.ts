import { Module } from '@nestjs/common';
import { QuoteModule } from './quote/quote.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/kaamelott'),
    QuoteModule,
    LeaderboardModule
  ],
})
export class AppModule {}
