const
  React = require('react')
;

require('../css/FlexCol.scss');

module.exports = ({children, style, className = ''}) => (
  <div className={'flex-col ' + className} style={style}>
    {children}
  </div>
);
