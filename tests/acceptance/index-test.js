import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | index');

test('visiting /index', function(assert) {
  visit('/').then(function() {
    assert.equal(currentURL(), '/');
    assert.equal(document.querySelector('.scroll-height').innerText.trim(), `${document.body.scrollHeight}`, 'Correct scrollHeight');
    assert.equal(document.querySelector('.scroll-width').innerText.trim(), `${document.body.scrollWidth}`, 'Correct scrollWidth');
    let lastScrollB = (document.body.scrollHeight - document.documentElement.clientHeight) - document.documentElement.scrollTop;
    assert.equal(document.querySelector('.scroll-bottom').innerText.trim(), `${lastScrollB}`, 'Correct scrollBottom');
    assert.equal(document.querySelector('.scroll-right').innerText.trim(), `${(document.body.scrollWidth - document.documentElement.clientWidth) - document.documentElement.scrollLeft}`, 'Correct scrollRight');
    assert.equal(document.querySelector('.scroll-top').innerText.trim(), `${document.body.scrollTop}`, 'Correct scrollTop');
  });

});
