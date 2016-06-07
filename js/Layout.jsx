const
  React = require('react')
;

require('../css/site.scss');

module.exports = (props) => (
  <div id={'layout'} className={'container-fluid'}>
    <main className={'row'}>
      <div className={'col-xs-12'}>
        { props.children }
      </div>
    </main>
  </div>
);
