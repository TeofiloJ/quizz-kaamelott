import { ApiProperty } from "@nestjs/swagger";

export class QuoteCreateDto {
    @ApiProperty()
    readonly id: Number;
    @ApiProperty()
   readonly text: String;
   @ApiProperty()
   readonly actor: String;
   @ApiProperty()
   readonly author: String;
   @ApiProperty()
   readonly season: String;
   @ApiProperty()
   readonly episode: String;
   @ApiProperty()
   readonly character: String;

}