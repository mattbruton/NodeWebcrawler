// If user's initial input didn't include http/https, prepend input with http
const prependIncompleteUrl = input => {
  let startsWithHttp = input.startsWith('https://') || input.startsWith('http://');
  return startsWithHttp ? input : input = `http://${input}`;
};

// Return if user's initial input looks remotely like a url:
const checkUserInputForValidUrl = input => {
  const re = /[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/;
  return (input.match(re)) ? true : false;
};

// If it looks like a url, does it begin with http:
const checkForProtocol = input => {
  const re = /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/){1}[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/;
  return (input.match(re)) ? true : false;
};

// Returns valid url or null depending on how far off user's input was initially
export const validateInput = input => {
  if (checkUserInputForValidUrl(input)) {
      if (checkForProtocol(input) === false) {
        input = prependIncompleteUrl(input);
      }
      return input;
  } else {
      return null;
  }
};