const
  React = require('react')
  ,{Navigation} = require('react-router')
  ,HackerNews = require('./HackerNews')
  ,Blank = require('./Blank')
;

class Index extends React.Component {
  componentDidMount () {
    // console.log();
    // setTimeout(() => this.context.router.push('intro'),  3000);
  }
  render () {
    return (
      <div className={'row'}>
        <div className={'col-md-4'}>
          <div className={'panel'}>
            <a href="mailto:rkichenama@gmail.com">Richard Kichenama</a>
          </div>
        </div>
        <div className={'col-md-4'}><div className={'panel'}><Blank /></div></div>
        <div className={'col-md-4'}><div className={'panel'}><Blank /></div></div>
        <div className={'col-md-4'}><div className={'panel'}><Blank /></div></div>
        <div className={'col-md-4'}><div className={'panel'}><Blank /></div></div>
        <div className={'col-md-4'}>
          <div className={'panel'}>
            <HackerNews />
          </div>
        </div>
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
