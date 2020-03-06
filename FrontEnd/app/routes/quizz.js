import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';

export default class QuizzRoute extends Route {

  model(params){
      return this.store.query('quote', {
            filter: {
              seasons: params['seasons']
            }
          })
    }

}
