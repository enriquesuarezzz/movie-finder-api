// validators.js

/**
 * Check if a string is a valid date in YYYY-MM-DD format
 * @param {string} date
 * @returns {boolean}
 */
export const isValidDate = (date) => {
  // Regular expression for DD/MM/YYYY format
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  return regex.test(date);
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
