import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';

export default class QuizzRoute extends Route {

  model(params) {
    return this.store.query('quote', {
      filter: {
        season: params['seasons']
      }
    }).then(function (res) {
      return res
    })
  }

  resetController(controller, isExiting, transition) {
    if (isExiting && transition.targetName !== 'error') {
      console.log("Reset Controller !!")
      controller.set('nbAnswer', 0);
      controller.set('score', 0);
      controller.set('lastQuote', null);
      controller.set('isFinished', null);
      controller.set('name', null);
      controller.set('seasons', null);
      controller.set('lastAnswer', null);
      controller.set('isValid', null);
      controller.set('answerStyle', null);
    }
  }

}
