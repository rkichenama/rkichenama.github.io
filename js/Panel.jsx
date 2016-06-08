const
  React = require('react')
;

module.exports = class Panel extends React.Component {
  render () {
    const {className = '', children} = this.props;
    return (<div className={'panel ' + className}>{children}</div>);
  }
};
