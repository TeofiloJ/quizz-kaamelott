import { Controller, Get, Post, Body, Put, Query, Param } from "@nestjs/common";
import { Leaderboard } from "./leaderboard.interface";
import { LeaderboardService } from "./leaderboard.service";
import { LeaderboardCreateDto } from "./leaderboard.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { quotes } from "src/quote/quote.data";

@Controller('leaderboards')
@ApiTags('leaderboards')
export class LeaderboardController {
    constructor(private readonly leaderboardService: LeaderboardService){}
    
    @ApiOperation({ summary: 'Get all score in the leaderboard' })
    @Get()
    async findAll(@Query()  query): Promise<Leaderboard[]>{
        return this.leaderboardService.findAll(query.limit);
    }



    @Get(':id')    
    async findOne(@Param('id') id: String): Promise<Leaderboard>{
        return this.leaderboardService.findOne(id);
    }

    @Post()
    async create(@Body()  dto : LeaderboardCreateDto){
        return this.leaderboardService.create(dto)
    }
    }