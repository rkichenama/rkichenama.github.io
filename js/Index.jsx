const
  React = require('react')
  ,{Navigation} = require('react-router')
  ,HackerNews = require('./HackerNews')
  ,Blank = require('./Blank')
  ,Figures = require('./Figures')
;

require('../css/deck.scss');

const ClickBait = (props) => (
  <div className={'click-bait'} {...props}></div>
);

const oy = {
  v: 300
};
class Index extends React.Component {
  constructor () {
    super();
    this._handleClick = this._handleClick.bind(this);
    this.state = {v: 0};
  }
  componentDidMount () {
    // console.log();
    // setTimeout(() => this.context.router.push('intro'),  3000);
    setInterval(() => this.setState({v: (new Date()).getTime() % 1e7}), 1250);
  }
  _handleClick (evt) {
    if (/click-bait/i.test(evt.target.className)) {
      [].map.call(this.refs.deck.querySelectorAll('.panel'), (elm) => elm.parentNode)
        .forEach((bucket) => bucket.className = 'col-md-2')
      ;
      evt.target.parentNode.parentNode.className = 'col-md-8 expanded-tile';
    }
  }
  render () {
    return (
      <div ref={'deck'} className={'row deck'} onClick={this._handleClick}>
        <div className={'col-md-4'}>
          <div className={'panel'}>
            <ClickBait />
            <Figures value={this.state.v} base={16} />
          </div>
        </div>
        <div className={'col-md-4'}>
          <div className={'panel'}>
            <ClickBait />
            <HackerNews />
          </div>
        </div>
        <div className={'col-md-4'}><div className={'panel'}><ClickBait /><Blank /></div></div>
        <div className={'col-md-4'}><div className={'panel'}><ClickBait /><Blank /></div></div>
        <div className={'col-md-4'}><div className={'panel'}><ClickBait /><Blank /></div></div>
        <div className={'col-md-4'}><div className={'panel'}><ClickBait /><Blank /></div></div>
        { this.props.children }
      </div>
    );
  }
}
// Index.contextTypes = {
//     router: React.PropTypes.object.isRequired
//   };
Index.title = 'Home';
Index.path = '/';

module.exports = Index;
