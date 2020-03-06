import Route from '@ember/routing/route';

export default class QuotesRoute extends Route {
  model() {
    return this.store.findAll('quote');
  }
}