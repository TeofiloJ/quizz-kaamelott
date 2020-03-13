import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class QuizzController extends Controller {
  queryParams = ['seasons'];
  @tracked seasons = null;

  @tracked score = 0

  @tracked nbAnswer = 0

  @tracked isFinished = false

  @action 
  updateScore(score){
      this.score += score
      this.nbAnswer++
  }

  @action
  checkIfQuizzFinished(){
    if (this.nbAnswer == 10) {
      this.isFinished = true;
      //call score feature
    }
  }
}
