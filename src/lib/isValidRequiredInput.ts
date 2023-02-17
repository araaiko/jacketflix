/**
 * Show an alert if required input is blank
 * @param args Required input values
 */
export const isValidRequiredInput = (...args: string[]): boolean => {
  let validator = true;
  for (let i = 0; i < args.length; i = (i + 1) | 0) {
    if (args[i] === '') {
      validator = false;
    }
  }
  return validator;
};
