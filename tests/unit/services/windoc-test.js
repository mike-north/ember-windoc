import { moduleFor, test } from 'ember-qunit';

moduleFor('service:windoc', 'Unit | Service | windoc', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('adds a single resize and a single scroll event listener', function(assert) {
  let eventCounts = { total: 0 };
  let canceledId = null;

  let service = this.subject({
    w: {
      addEventListener(evtType) {
        eventCounts[evtType] = (eventCounts[evtType] || 0) + 1;
        eventCounts.total++;
      },
      setInterval() {
        return 123;
      },
      clearInterval(x) {
        canceledId = x;
      }
    }
  });

  assert.equal(eventCounts.resize, 1, 'One resize listener');
  assert.equal(eventCounts.scroll, 1, 'One scroll listener');
  assert.equal(eventCounts.total, 2, 'Three total listeners');
  service._cancelRefreshPollLoop();
  assert.equal(canceledId, 123, 'canceling poll task clears interval');
});

test('retrieves basic properties from correct places', function(assert) {
  let service = this.subject({
    w: {
      document: {
        documentElement: {
          clientHeight: 21,
          clientWidth: 231,
          scrollTop: 221,
          scrollLeft: 121,
          scrollHeight: 83,
          scrollWidth: 14
        }
      },
      addEventListener() { },
      setInterval() { },
      clearInterval() { }
    }
  });

  assert.equal(service.get('clientHeight'), 21, 'clientHeight');
  assert.equal(service.get('clientWidth'), 231, 'clientWidth');
  assert.equal(service.get('scrollTop'), 221, 'scrollTop');
  assert.equal(service.get('scrollLeft'), 121, 'scrollLeft');
  assert.equal(service.get('scrollHeight'), 83, 'scrollHeight');
  assert.equal(service.get('scrollWidth'), 14, 'scrollWidth');

});

test('retrieves secondary properties from correct places', function(assert) {
  let service = this.subject({
    w: {
      document: {
        documentElement: {
          clientHeight: 50,
          clientWidth: 100,
          scrollTop: 25,
          scrollLeft: 40,
          scrollHeight: 100,
          scrollWidth: 200
        }
      },
      addEventListener() { },
      setInterval() { },
      clearInterval() { }
    }
  });

  assert.equal(service.get('scrollRight'), 60, 'scrollRight');
  assert.equal(service.get('scrollBottom'), 25, 'scrollBottom');

  assert.equal(service.get('scrollHRatio'), 0.4, 'scrollHRatio');
  assert.equal(service.get('scrollVRatio'), 0.5, 'scrollVRatio');

});
