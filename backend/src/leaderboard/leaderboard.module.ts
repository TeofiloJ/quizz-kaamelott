import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LeaderboardSchema } from "./leaderboard.schema";
import { LeaderboardController } from "./leaderboard.controller";
import { LeaderboardService } from "./leaderboard.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'leaderboard', schema: LeaderboardSchema }])],
    controllers: [LeaderboardController],
    providers: [LeaderboardService],
    exports:[LeaderboardService]

})
export class LeaderboardModule{}