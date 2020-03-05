import Model, { attr } from '@ember-data/model';

export default class QuoteModel extends Model {
    @attr citation;
}
