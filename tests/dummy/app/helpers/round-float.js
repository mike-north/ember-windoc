import Ember from 'ember';

export function roundFloat(params/*, hash*/) {
  return Math.round(1000 * params[0]) / 1000;
}

export default Ember.Helper.helper(roundFloat);
