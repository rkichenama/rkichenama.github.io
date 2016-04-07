const
  React = require('react')
  ,Loading = require('./Loading')
;

require('../css/HackerNews.scss');

const hackerNews = require('./feed');

const pad = (n, w = 2, z = '0') => {
  n = '' + n;
  return (n.length >= w ? n : (new Array(w - n.length + 1)).join(z) + n);
};
const formatDate = (t) => {
  let d = new Date(Date(t));
  return `${pad(d.getMonth())}/${pad(d.getDay())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const HackerNewsItem = ({title, url, score}) => (
  <li>
    <div className={'item'}>
      <div className={'item-title'}><a href={url}>{title}</a></div>
      <div className={'item-score'}>{score}</div>
    </div>
  </li>
);

class HackerNews extends React.Component {
  constructor () {
    super();

    this.state = {
      items: [],
      subscription: null,
    };
  }
  componentDidMount () {
    this.setState({subscription: hackerNews.subscribe((a) => this.setState({items: a}))});
  }
  componentWillUnmount () {
    this.state.subscription.unsubscribe();
  }
  render () {
    return this.state.items.length ? (
      <article className={'hackerNews'}>
        <header>Top 5 from HackerNews</header>
        <ul>
        {
          this.state.items.map((item, i) => (
            <HackerNewsItem key={i} {...item} />
          ))
        }
        </ul>
        <footer>last updated: {formatDate(this.state.items[0].time)}</footer>
      </article>
    ) : (<Loading />);
  }
}

module.exports = HackerNews;
