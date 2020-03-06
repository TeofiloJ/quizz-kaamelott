import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class QuizzController extends Controller {
  queryParams = ['seasons'];
  @tracked seasons = null;  
}
