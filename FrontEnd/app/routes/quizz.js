import Route from '@ember/routing/route';

export default class QuizzRoute extends Route {
    model(){
        debugger;
        return this.store.query('quote', {
            filter: {
              seasons: this.seasons
            }
          })
    }

}
