import { module, test } from 'qunit';
import { visit, currentURL, click, pauseTest } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | level menu', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /level-menu', async function(assert) {
    await visit('/level-menu');

    assert.equal(currentURL(), '/level-menu');
  });

  test('clicking on chapter one', async function(assert) {
    await visit('/level-menu');

    await click('div.chapter');
    // console.log()
    // await pauseTest();  
    assert.ok(document.querySelector('div.overlay.selected'));

  });
});
