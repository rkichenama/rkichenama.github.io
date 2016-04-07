const
  React = require('react')
  ,Loading = require('./Loading')
;

class Blank extends React.Component {
  render () {
    return (<Loading />);
  }
}

module.exports = Blank;
