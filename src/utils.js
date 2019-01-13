export const isNode = a => a instanceof window.HTMLElement;

export const isFalsy = a => a == null || a === false;

export const isString = a => typeof a === 'string';
