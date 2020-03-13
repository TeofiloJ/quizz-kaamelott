import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class QuizzController extends Controller {
  queryParams = ['seasons'];
  @tracked seasons = null;

  @tracked score = 0

  @tracked nbAnswer = 0

  @tracked isFinished = false

  @tracked quotes = this.get('model')
  
  activeQuoteIndex = 0
  @tracked activeQuote = this.quotes.content[this.activeQuoteIndex].__recordData._data
  
  @tracked answerStyle

  @tracked lastQuote

  @tracked lastAnswer

  @action 
  updateScore(score){
      this.score += score
      this.nbAnswer++
  }

  @action
  updateResponse(lastAnswer, answerStyle){
    this.lastQuote = this.activeQuote
    this.lastAnswer = lastAnswer
    this.answerStyle = answerStyle
  }

  @action
  checkIfQuizzFinished(){
    if (this.nbAnswer == 10) {
      this.isFinished = true;
      return this.isFinished
      //call score feature
    }
    return this.isFinished
  }

  @action
  updateQuestionComponent(){
    this.activeQuoteIndex++
    this.activeQuote = this.quotes.content[this.activeQuoteIndex].__recordData._data
    
    return this.activeQuoteIndex
  }
}
