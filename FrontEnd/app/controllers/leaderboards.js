import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LeaderboardsController extends Controller {
    queryParams = ['name', 'score'];

    @tracked name = null;
    @tracked score = null;

}
