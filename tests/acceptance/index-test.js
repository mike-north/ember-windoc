import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | index');

test('visiting /index', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('.scroll-height').text(), `${document.body.scrollHeight}`, 'Correct scrollHeight');
    assert.equal(find('.scroll-width').text(), `${document.body.scrollWidth}`, 'Correct scrollWidth');
    let lastScrollB = (document.body.scrollHeight - document.documentElement.clientHeight) - document.documentElement.scrollTop;
    assert.equal(find('.scroll-bottom').text(), `${lastScrollB}`, 'Correct scrollBottom');
    assert.equal(find('.scroll-right').text(), `${(document.body.scrollWidth - document.documentElement.clientWidth) - document.documentElement.scrollLeft}`, 'Correct scrollRight');
    assert.equal(find('.scroll-top').text(), `${document.body.scrollTop}`, 'Correct scrollTop');
  });

});
