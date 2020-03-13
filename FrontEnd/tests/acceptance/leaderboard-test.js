import { module, test } from 'qunit';
import { visit, currentURL, click, pauseTest } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';


module('Acceptance | leaderboards', function(hooks) {
    setupApplicationTest(hooks);
    setupMirage(hooks);

    test('visiting /leaderboards', async function(assert) {
        await visit('/leaderboards');
        assert.equal(currentURL(), '/leaderboards');
      });
    
      test("get leaderboard", async function(assert) {
        this.server.createList("leaderboard", 10);
    
        await visit("/leaderboards");
    
        assert.dom("div.row-leaderboard").exists({ count: 10 });
      });

    });