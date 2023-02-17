/**
 * Validate input email
 * @param email
 */
export const isValidEmailFormat = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; // eslint-disable-line no-useless-escape
  return regex.test(email);
};
