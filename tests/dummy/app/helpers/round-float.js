import Ember from 'ember';

const { Helper: { helper } } = Ember;

export function roundFloat(params/* , hash*/) {
  return Math.round(1000 * params[0]) / 1000;
}

export default helper(roundFloat);
