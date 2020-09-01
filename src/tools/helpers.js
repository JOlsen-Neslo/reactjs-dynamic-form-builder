/**
 * Utililty function for setting class names onto the document.body.
 *
 * @param {string} classNames - string containing list of class names to apply.
 */
export const setBodyClass = (classNames) => {
  if (isUndefined(classNames)) {
    document.body.className = '';
    return;
  }

  return document.body.classList.add(classNames);
};

/** Tool to check nulls */
export const isNull = (value) => value === null;

/** Check for non-null blank strings */
export const isEmptyString = (value) => !isNull(value) && value.trim() === '';

/** Tool to check empty arrays */
export const isEmpty = (arr) => arr.length === 0;

/** Tool to check for undefined */
export const isUndefined = (value) => typeof value === 'undefined';

/** A placeholder function that does nothing. */
export const noOp = () => {};

/** Used by event handlers to prevent default event behaviour. */
export const preventDefault = (e) => e.preventDefault();

/** An asynchronous delay function */
export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Generate a random ID, to avoid using `index` as `key`.
 * Converts a random seed to base 36 (numbers & letters), then takes the first 9 chars after decimal.
 */
export const generateId = () => `_${Math.random().toString(36).substr(2, 9)}`;

/** Converts a boolean to its corresponding integer using the unary operator. Returns `value` as-is, for types other than `boolean`. */
export const convertBoolToInt = (value) => {
  if (typeof value !== 'boolean') return value;
  return +value;
};

/**
 * Joins a `baseClassName` together with an array of associated class `modifiers`.
 *
 * @param {string} baseClassName - the class name of the component, also used for prefixing modifiers
 * @param {object} modifiers - object with keys being the modifier name, their values being a boolean
 *  representing whether the modifier is active
 *
 * @example <caption>Get class names for element 'button' with modifiers 'large', 'disabled'.</caption>
 * getClassNames('button', {large: true, disabled: true})
 * // returns 'button button--large button--disabled'
 *
 */
export function getClassNames(baseClassName, modifiers = {}) {
  const classes = [baseClassName];

  Object.entries(modifiers).forEach(([name, active]) => {
    if (!active) return;

    classes.push(`${baseClassName}--${name}`);
  });

  return classes.join(' ');
}

export function getFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_) => resolve(reader.result);
    reader.onerror = (e) => reject(e);
  });
}

export const sortDateDesc = (a, b) => new Date(b.date) - new Date(a.date);
export const sortBoolDesc = (a, b) => ((a === b) ? 0 : a ? -1 : 1);

export const isDateToday = (date) => {
  const dateObj = new Date(date);
  const today = new Date();
  return dateObj.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
};
