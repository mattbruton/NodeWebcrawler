export const findAllUrls = (data) => {
  return new Promise(function (resolve, reject) {
    const re = /((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/){1}[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5})/ig;
    resolve(data.match(re));
  });
};

// Couldn't find another way to check accurately without having some hard coded list of TLDs.
export const removeSubDomain = (str) => {
  const re2 = /([a-z0-9]+)\.(arpa|asia|au|be|biz|com|co\.uk|de|edu|gov|ie|int|io|it|ly|mil|net|org|org\.uk|ru)/;
  if (str.match(re2)) {
    return str.match(re2)[0];
  }
};

export const subDomainHelper = (urls) => {
  return new Promise((resolve, reject) => {
      return resolve(urls.map(url => removeSubDomain(url)));
  });
};