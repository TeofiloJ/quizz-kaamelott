import Route from '@ember/routing/route';

export default class LeaderboardRoute extends Route {
  model() {
    return this.store.findAll('leaderboard');
  }
}