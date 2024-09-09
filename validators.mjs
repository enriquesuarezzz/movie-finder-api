// validators.js

/**
 * Check if a string is a valid date in YYYY-MM-DD format
 * @param {string} date
 * @returns {boolean}
 */
export const isValidDate = (date) => {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
};

/**
 * Check if a string is a valid URL
 * @param {string} url
 * @returns {boolean}
 */
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Check if a value is a positive number
 * @param {number} value
 * @returns {boolean}
 */
export const isPositiveNumber = (value) => {
  return Number.isInteger(value) && value > 0;
};
