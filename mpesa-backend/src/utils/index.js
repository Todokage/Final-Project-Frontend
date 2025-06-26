import { isEmail, isEmpty } from 'validator';

export const validateEmail = (email) => {
  return isEmail(email);
};

export const validateInput = (input) => {
  return !isEmpty(input);
};

export const logError = (error) => {
  console.error('Error:', error);
};

export const logInfo = (message) => {
  console.log('Info:', message);
};