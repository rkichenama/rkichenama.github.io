const
  Rx = require('rxjs-es/Rx')
;

const RequestPromise = (url) => {
  return new Promise((res, rej) => {
      let req = new XMLHttpRequest();
      req.open('GET', url);
      req.onload = () => {
        switch (req.status) {
          case 200: res(JSON.parse(req.response)); break;
          default: rej(req.statusText); break;
        }
      };
      req.onerror = () => { rej('Network Error'); };
      req.send();
    })
    .catch((err) => { return err; });
};
// https://hacker-news.firebaseio.com/v0/topstories.json
// https://hacker-news.firebaseio.com/v0/item/11449029.json
const HackerNews = () => {
  let subject = new Rx.Subject();
  setInterval(() => {
    RequestPromise('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then((jsonOrError) => {
      if (typeof jsonOrError !== 'string') {
        return Promise.all(
          jsonOrError
            .slice(0, 5)
            .map(
              (item) => RequestPromise('https://hacker-news.firebaseio.com/v0/item/' + item + '.json')
            )
        );
      }
    })
    .catch((err) => { return err; })
    .then((jsonOrError) => {
      if (typeof jsonOrError !== 'string') {
        subject.next(jsonOrError);
      }
    });
  }, 5000);
  return subject;
}

module.exports = HackerNews();
