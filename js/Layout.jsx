const
  React = require('react')
  ,{ Link } = require('react-router')
;

require('../css/site.scss');

const Layout = (props) => (
  <div id={'layout'} className={'container'}>
    <nav className={'row'}>
      <div className={'col-xs-12'}>
        <ul className={'nav navbar-nav'}>
          <li><Link activeClassName={'breadcrumb-active'} to="/">Home</Link></li>
          <li><Link activeClassName={'breadcrumb-active'} to="intro">Intro</Link></li>
          <li><Link activeClassName={'breadcrumb-active'} to="basketball">Basketball</Link></li>
        </ul>
      </div>
    </nav>
    <main className={'row'}>
      <div className={'col-xs-12'}>
        { props.children }
      </div>
    </main>
  </div>
);


module.exports = Layout;
