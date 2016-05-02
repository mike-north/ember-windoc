/*global FastBoot:true*/
import Ember from 'ember';

const {
  computed,
  Service,
  typeOf,
  Evented
} = Ember;

const WINDOW_PROPERTIES = [
  'innerHeight',
  'innerWidth',
  'outerHeight',
  'outerWidth',
  'screenX',
  'screenY'
];

const POLL_PROPERTY_INTERVAL = 250; // ms
const PROPERTIES_TO_CHANGE_ON_INTERVAL = [
  'screenX',
  'screenY'
];

const WINDOW_EVENTS = [{
  event: 'resize',
  invalidateProperties: [
    'innerWidth',
    'innerHeight',
    'outerWidth',
    'outerHeight',
    'scrollHeight',
    'scrollWidth',
    'scrollLeft',
    'scrollTop',
    'clientWidth',
    'clientHeight',
    'screenY',
    'screenX'
  ]
}, {
  event: 'scroll',
  invalidateProperties: [
    'scrollLeft',
    'scrollTop'
  ]
}];

const FAKE_WINDOW = {
  addEventListener() {},
  setInterval() {},
  clearInterval() {}
};

const serviceCfg = {
  w: typeof FastBoot === 'undefined' ? window : FAKE_WINDOW,
  init() {
    this._super(...arguments);
    WINDOW_EVENTS.forEach((evtInfo) => {
      this.w.addEventListener(evtInfo.event, (evt) => {
        if (evtInfo.invalidateProperties &&
          typeOf(evtInfo.invalidateProperties) === 'array') {
          Ember.run.next(() => {
            evtInfo.invalidateProperties.forEach((p) => {
              this.notifyPropertyChange(p);
              this.trigger(evtInfo.event, evt);
            });
          });
        }
      });
    });

    this._startRefreshPollLoop();
  },

  destroy() {
    this._cancelRefreshPollLoop();
    this._super(...arguments);
  },

  _cancelRefreshPollLoop() {
    this.get('w').clearInterval(this._refreshPollLoop);
    this._refreshPollLoop = null;
  },

  _startRefreshPollLoop() {
    if (this._refreshPollLoop) {
      this._cancelRefreshPollLoop();
    }
    this._refreshPollLoop = this.get('w').setInterval(() => {
      Ember.run.next(() => {
        PROPERTIES_TO_CHANGE_ON_INTERVAL.forEach((p) => {
          this.notifyPropertyChange(p);
        });
      });
    }, POLL_PROPERTY_INTERVAL);
  },

  clientHeight: computed(function() {
    return this.get('w.document.documentElement.clientHeight') || 0;
  }).volatile(),
  clientWidth: computed(function() {
    return this.get('w.document.documentElement.clientWidth') || 0;
  }).volatile(),
  scrollTop: computed(function() {
    return this.get('w.document.documentElement.scrollTop') ||
      this.get('w.document.body.scrollTop') || 0;
  }).volatile(),
  scrollLeft: computed(function() {
    return this.get('w.document.documentElement.scrollLeft') ||
      this.get('w.document.body.scrollLeft') || 0;
  }).volatile(),
  scrollHeight: computed(function() {
    return this.get('w.document.documentElement.scrollHeight') ||
      this.get('w.document.body.scrollHeight') || 0;
  }).volatile(),
  scrollWidth: computed(function() {
    return this.get('w.document.documentElement.scrollWidth') ||
      this.get('w.document.body.scrollWidth') || 0;
  }).volatile(),

  scrollRight: computed('scrollLeft', 'scrollWidth', 'clientWidth', function() {
    return (this.get('scrollWidth') - this.get('clientWidth')) - this.get('scrollLeft');
  }),

  scrollBottom: computed('scrollTop', 'scrollHeight', 'clientHeight', function() {
    return (this.get('scrollHeight') - this.get('clientHeight')) - this.get('scrollTop');
  }),

  scrollHRatio: computed('scrollLeft', 'scrollWidth', 'clientWidth', function() {
    if (this.get('scrollWidth') === this.get('clientWidth')) {
      return 1;
    } else {
      return this.get('scrollLeft') / (this.get('scrollWidth') - this.get('clientWidth'));
    }
  }),
  scrollVRatio: computed('scrollTop', 'scrollHeight', 'clientHeight', function() {
    return this.get('scrollTop') / (this.get('scrollHeight') - this.get('clientHeight'));
  })
};

WINDOW_PROPERTIES.forEach(function(propInfo) {
  switch (typeOf(propInfo)) {
    case 'string':
      serviceCfg[propInfo] = computed(function() {
        return this.get(`w.${propInfo}`) || 0;
      });
      break;
    default:
      throw `Invalid property value: ${propInfo} of type ${typeOf(propInfo)}`;
  }
});

export default Service.extend(Evented, serviceCfg);
