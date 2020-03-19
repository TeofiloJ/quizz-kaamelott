import { module, test } from 'qunit';
import { visit, currentURL, click, pauseTest,fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | quizz', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /Quizz', async function(assert) {
    await visit('/quizz?seasons=Livre%20IV%20%2CLivre%20III%20%2CLivre%20II%20');

    assert.equal(currentURL(), '/quizz?seasons=Livre%20IV%20%2CLivre%20III%20%2CLivre%20II%20');
  });

  test('clicking on answer one', async function(assert) {
    await visit('/quizz?seasons=Livre%20IV%20%2CLivre%20III%20%2CLivre%20II%20');
    await click('button.btn.btn-dark');
    
    assert.equal(document.querySelector('div.card-header').textContent.trim(),"Dernière réponse :");
  });

  test('clicking on scoredboard', async function(assert) {
    await visit('/quizz?seasons=Livre%20IV%20%2CLivre%20III%20%2CLivre%20II%20');
    await click('button.btn.btn-dark');//1
    await click('button.btn.btn-dark');//2
    await click('button.btn.btn-dark');//3
    await click('button.btn.btn-dark');//4
    await click('button.btn.btn-dark');//5
    await click('button.btn.btn-dark');//6
    await click('button.btn.btn-dark');//7
    await click('button.btn.btn-dark');//8
    await click('button.btn.btn-dark');//9
    await click('button.btn.btn-dark');//10
    await fillIn('input.form-control.ember-text-field.ember-view', 'toto');
    await click('button.btn.btn-success');
    
    assert.equal(currentURL().substring(0,currentURL().length - 1), '/leaderboards?name=toto&score=0');
  });
});
