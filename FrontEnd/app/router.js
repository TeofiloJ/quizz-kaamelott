import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('leaderboards');
  this.route('quotes');
  this.route('level-menu');
  this.route('quizz');
  this.route('leaderboard');
});
