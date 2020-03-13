import Model, { attr } from '@ember-data/model';

export default class QuizzModel extends Model {

    @attr('string') quoteId;
    @attr('string') text;
    @attr('string') author;
    @attr('string') character;
    @attr('string') actor;
    @attr('string') season;
    @attr('string') episode;

}
