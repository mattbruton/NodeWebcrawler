export const findAllUrls = (data) => {
  return new Promise(function (resolve, reject) {
    const re = /((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/){1}[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5})/ig;
    resolve(data.match(re));
  });
};