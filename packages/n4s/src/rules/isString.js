import bindNot from 'bindNot';

export function isString(value) {
  return Boolean(typeof value === 'string');
}

export const isNotString = bindNot(isString);
