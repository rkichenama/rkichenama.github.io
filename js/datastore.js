/*global Storage, Rx */
/* exported _DataStore */
const
  Rx = require('rxjs-es/Rx')
;
/**
 * DataStore (hidden) class
 */
module.exports = class _DataStore extends Rx.Subject {

  /**
   * @param {boolean} [useSessionIfAvailable] - toggle for weather to use true or emulated sessionStorage, defaults to true
   */
  constructor (useSessionIfAvailable = true) {
    super();
    this._entries = [];
    if (useSessionIfAvailable && !((/undefined/).test(typeof Storage))) {
      this.dictionary = sessionStorage;
      this._entries = JSON.parse(this.dictionary.getItem(this._key()) || '[]');
    } else {
      // emulate sessionStorage
      this.dictionary = new (function () {
        var dictionary = {};
        this.setItem = (key, json) => { dictionary[key] = json; };
        this.getItem = (key) => { return dictionary[key] || null; };
        this.removeItem = (key) => {
          dictionary = Object.keys(dictionary)
            .reduce((newDictionary, k) => {
              if (k !== key) {
                newDictionary[k] = dictionary[k];
              }
              return newDictionary;
            }, {});
        };
      })();
    }
  }

  /**
   * @return {string}
   */
  _key () {
    const key = '__e';
    return key;
  }

  static _fetch (url) {
    //TODO: replace with a cancelable Promise and/or prep for streaming
    return new Promise((res, rej) => {
        let req = new XMLHttpRequest();
        req.open('GET', url);
        req.onload = () => {
          switch (req.status) {
            case 200: res(JSON.parse(req.response)); break;
            /*istanbul ignore  next */
            default: rej(req.statusText); break;
          }
        };
        /*istanbul ignore next */
        req.onerror = () => { rej('Network Error'); };
        req.send();
      })
      /*istanbul ignore next */
      .catch(() => {
        //TODO: handle failure to get urlbetter
        return {};
      });
  }

  /**
   * @param {string} key - unique key to store under
   * @param {object} json - an object that will be serialized and stored
   */
  put (key, json) {
    if (json instanceof Array) {
      json = {
        response: json,
      };
    }

    this.dictionary.setItem(key, JSON.stringify(json));
    if (this._entries.indexOf(key) < 0) {
      this._entries.push(key);
      this.dictionary.setItem(this._key(), JSON.stringify(this._entries));
    }
    this.onNext({source: key, data: json});
  }

  /**
   * @param {string} key - unique key whose value to retrieve
   * @return {object} - deserialized object stored or null if key not found
   */
  get (key) {
    if (this._entries.indexOf(key) >= 0) {
      return JSON.parse(this.dictionary.getItem(key));
    } else {
      return undefined;
    }
  }

  /**
   * @param {string} key - unique key whose value to retrieve
   * @return {Promise} - a promise that will receive the json or null
   */
  fetch (key) {
    let dataStore = this;
    if (this._entries.indexOf(key) >= 0) {
      let json = JSON.parse(this.dictionary.getItem(key));
      return new Promise((res) => {
         this.onNext({source: key, data: json}); // alert all listeners
         res(json); // return data
       });
    } else {
      return _DataStore._fetch(key)
        .then(
          (d) => {
            dataStore.put(key, d);
            return dataStore.get(key);
          }
        );
    }
  }

  /**
   * Clears the dictionary
   */
  clear () {
    if (this._entries && this._entries.length) {
      this._entries.forEach((key) => {
        this.dictionary.removeItem(key);
      });
      this._entries = [];
      this.dictionary.setItem(this._key(), this._entries);
    }
  }

  // beta tweak
  onNext (obj) { this.next(obj); }
}
