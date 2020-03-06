import { Injectable, Logger } from "@nestjs/common";
import { QuoteService } from "./quote/quote.service";

@Injectable()
export class Seeder{
    constructor(
    private readonly logger: Logger,
    private readonly quoteService :QuoteService
    ){}
    async seed(){

        await this.quotes().then(completed => {
            this.logger.debug('Successfuly completed seeding quotes...');      
              Promise.resolve(completed);
          }).catch(error => {
            this.logger.error('Failed seeding quote...');
            Promise.reject(error);
          })
    }

    async quotes() {
        return await Promise.all(this.quoteService.createSeeder()).then(
            CreatedQuote => {
            // Can also use this.logger.verbose('...');
            this.logger.debug(
              'No. of quotes created : ' +
                // Remove all null values and return only created regions.
                CreatedQuote.filter(
                  nullValueOrCreated => nullValueOrCreated,
                ).length,
          );
            return Promise.resolve(true);
          }).catch(error => Promise.reject(error));
      }

}