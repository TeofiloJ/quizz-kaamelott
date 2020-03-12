import Model, { attr } from '@ember-data/model';

export default class LeaderboardModel extends Model {
    @attr('string') name;
    @attr('string') score;

}