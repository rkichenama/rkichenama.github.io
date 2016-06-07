const
  React = require('react')
;

require('../css/FlexRow.scss');

module.exports = ({children, style, className = ''}) => (
  <div className={'flex-row ' + className} style={style}>
    {children}
  </div>
);
