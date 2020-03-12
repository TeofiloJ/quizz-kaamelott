import { ApiProperty } from "@nestjs/swagger";

export class LeaderboardCreateDto {
    @ApiProperty()
    readonly name: String;
    @ApiProperty()
    score: number;
}