const
  React = require('react')
  ,{Navigation} = require('react-router')
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
        <div className={'col-md-4'}><div className={'panel'}>4x1</div></div>
        <div className={'col-md-4'}><div className={'panel'}>4x1</div></div>
        <div className={'col-md-4'}><div className={'panel'}>4x1</div></div>
        <div className={'col-md-4'}><div className={'panel'}>4x1</div></div>
        <div className={'col-md-4'}><div className={'panel'}>4x1</div></div>
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
