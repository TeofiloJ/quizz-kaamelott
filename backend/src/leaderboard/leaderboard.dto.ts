import { ApiProperty } from "@nestjs/swagger";

export class LeaderboardCreateDto {
    @ApiProperty()
    name: String;
    @ApiProperty()
    score: number;
}