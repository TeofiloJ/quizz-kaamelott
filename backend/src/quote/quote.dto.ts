import { ApiProperty } from "@nestjs/swagger";

export class QuoteCreateDto {
    @ApiProperty()
   readonly quote: String;
   @ApiProperty()
   readonly actor: String;
   @ApiProperty()
   readonly author: String;
   @ApiProperty()
   readonly season: String;
   @ApiProperty()
   readonly episode: String;
}