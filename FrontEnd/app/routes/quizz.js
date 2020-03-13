import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';

export default class QuizzRoute extends Route {

  model(params){
    return this.store.query('quote', {
      filter: {
        season: params['seasons']
      }
      }).then(function(res) {
        console.log(res)
        return res
      })
  }

}
