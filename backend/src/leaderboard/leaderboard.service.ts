import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { Leaderboard } from "./leaderboard.interface";
import { LeaderboardCreateDto } from "./leaderboard.dto";
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
var JSONAPISerializer = require('jsonapi-serializer').Serializer;

@Injectable()
export class LeaderboardService{
  
    constructor(
        @InjectModel('leaderboard') private readonly leaderboardModel: Model<Leaderboard>) {}

      async create(dto): Promise<Leaderboard> {
        var leaderboardsSerializer = new JSONAPISerializer('leaderboards', {
          attributes: ['id', 'name', 'score']
        });
        var newDto = new LeaderboardCreateDto();
        newDto.name = dto.data.attributes.name;
        newDto.score = dto.data.attributes.score;
        if (newDto.score < 0) {
          throw  new HttpException(`valeur negative non autoriser`, HttpStatus.BAD_REQUEST);
        }

        newDto.score = Math.abs(Math.floor(newDto.score * 683))
        const createdLeaderboard = new this.leaderboardModel(newDto);
        return createdLeaderboard.save().then( result => { return  leaderboardsSerializer.serialize(result)});
      }
    
      async findAll(limit:number): Promise<any> {
        var leaderboardsSerializer = new JSONAPISerializer('leaderboards', {
          attributes: ['id', 'name', 'score']
        });
        var dblimit = Number(limit)
        const db =  this.leaderboardModel
        .find({},{'_id':0,'__v':0})
        .limit(dblimit)
        .sort({ score: -1 })
        .exec();
         return db.then( result => { return  leaderboardsSerializer.serialize(result)
           }
    )}

     

      async findOne(leaderboardId): Promise<any> {
        var leaderboardsSerializer = new JSONAPISerializer('leaderboards', {
          attributes: ['id', 'name', 'score']
        });
        const db =  this.leaderboardModel
            .findOne({id: leaderboardId},{'_id':0,'__v':0})
            .exec();
        return db.then( result => { return  leaderboardsSerializer.serialize(result)
        })
        
      }

       
        
  }
