/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var findAllUrls = exports.findAllUrls = function findAllUrls(data) {
  return new Promise(function (resolve, reject) {
    var re = /((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/){1}[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5})/ig;
    resolve(data.match(re));
  });
};

// Couldn't find another way to check accurately without having some hard coded list of TLDs.
var removeSubDomain = exports.removeSubDomain = function removeSubDomain(str) {
  var re = /([a-z0-9]+)\.(arpa|asia|au|be|biz|com|co\.uk|de|edu|gov|ie|int|io|it|ly|mil|net|org|org\.uk|ru)/;
  if (str.match(re)) {
    return str.match(re)[0];
  }
};

var subDomainHelper = exports.subDomainHelper = function subDomainHelper(urls) {
  return new Promise(function (resolve, reject) {
    return resolve(urls.map(function (url) {
      return removeSubDomain(url);
    }));
  });
};

var filterDomainsFromRoot = exports.filterDomainsFromRoot = function filterDomainsFromRoot(arr, root) {
  return new Promise(function (resolve, reject) {
    arr = arr.filter(function (url) {
      return url !== root;
    });
    return resolve(arr);
  });
};

var filterUndefined = exports.filterUndefined = function filterUndefined(arr) {
  return new Promise(function (resolve, reject) {
    return resolve(arr.filter(Boolean));
    // arr = arr.filter(url => {
    //   return url != undefined;
    // });
    // return resolve(arr);
  });
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _urlParser = __webpack_require__(0);

var Parser = _interopRequireWildcard(_urlParser);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var button = document.getElementById('btn');
var userInput = document.getElementById('url-input');
var resultsContainer = document.getElementById('container__results');

var fetchPage = function fetchPage(fetchThis) {
  return new Promise(function (resolve, reject) {
    fetch('./newUrl', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/html, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: fetchThis })
    }).then(function (res) {
      return res.text();
    }).then(function (data) {
      resolve(data);
    });
  });
};

var createIFrame = function createIFrame(html) {
  var iframe = document.createElement('iframe');
  iframe.setAttribute('srcdoc', html);
  iframe.setAttribute('height', '400px');
  iframe.setAttribute('width', '800px');
  if (document.querySelector('iframe')) {
    resultsContainer.removeChild(document.querySelector('iframe'));
  }
  resultsContainer.appendChild(iframe);
};

var getRootDomainForUserInput = function getRootDomainForUserInput() {
  return Parser.removeSubDomain(userInput.value);
};

button.addEventListener('click', function () {
  fetchPage(userInput.value).then(function (response) {
    createIFrame(response);
    return Parser.findAllUrls(response);
  }).then(function (data) {
    return Parser.subDomainHelper(data);
  }).then(function (data) {
    return Parser.filterDomainsFromRoot(data, getRootDomainForUserInput());
  }).then(function (data) {
    return Parser.filterUndefined(data);
  }).then(function (data) {
    return console.log(data);
  });
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map