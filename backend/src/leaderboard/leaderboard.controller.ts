import { Controller, Get, Post, Body, Put } from "@nestjs/common";
import { Leaderboard } from "./leaderboard.interface";
import { LeaderboardService } from "./leaderboard.service";
import { LeaderboardCreateDto } from "./leaderboard.dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@Controller('leaderboards')
@ApiTags('leaderboards')
export class LeaderboardController {
    constructor(private readonly leaderboardService: LeaderboardService){}
    
    @ApiOperation({ summary: 'Get all score in the leaderboard' })
    @Get()
    async findAll(): Promise<Leaderboard[]>{
    return this.leaderboardService.findAll();
    }
    @ApiOperation({ summary: 'Get top ten score in the leadeboard' })
    @Get('/topTen')
    async findTopTen(): Promise<Leaderboard[]>{
    return this.leaderboardService.findTopTen();
    }
    @Post()
    async create(@Body()  dto : LeaderboardCreateDto){
        return this.leaderboardService.create(dto)
    }
    }