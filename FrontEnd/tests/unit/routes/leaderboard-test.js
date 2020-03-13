import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | leaderboards', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let leaderboards = this.owner.lookup('route:leaderboards');
    assert.ok(leaderboards);
  });
});
