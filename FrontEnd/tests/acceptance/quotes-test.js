import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | quotes', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /quotes', async function(assert) {
    await visit('/quotes');

    assert.equal(currentURL(), '/quotes');
  });

  test("get all quotes", async function(assert) {
    this.server.createList("quote", 5);

    await visit("/quotes");

    assert.dom("div.quote-row").exists({ count: 5 });
  });

});
