import DOMPurify from "dompurify";
// Regex to validate input: only letters, numbers and whitespaces from any language
const validInputRegex = /^[\p{L}\p{N}\s]*$/u;

export const sanitizeAndValidateInput = (value) => {
  if (validInputRegex.test(value)) {
    return DOMPurify.sanitize(value); // Sanitize the input only if it is valid
  } else {
    alert("Only alphanumeric characters and spaces are allowed");
    return;
  }
};
