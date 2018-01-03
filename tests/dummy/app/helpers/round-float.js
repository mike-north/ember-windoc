import { helper } from '@ember/component/helper';

export function roundFloat(params/* , hash*/) {
  return Math.round(1000 * params[0]) / 1000;
}

export default helper(roundFloat);
