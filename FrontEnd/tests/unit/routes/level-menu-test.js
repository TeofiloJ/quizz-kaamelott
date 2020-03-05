import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | level-menu', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:level-menu');
    assert.ok(route);
  });
});
