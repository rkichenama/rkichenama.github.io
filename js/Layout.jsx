const
  React = require('react'),
  { Link } = require('react-router')
;

require('../css/site.scss');

const Layout = (props) => (
  <div id={'layout'} className={'container'}>
    <nav className={'row'}>
      <ul className={'nav navbar-nav'}>
        <li><Link activeClassName={'breadcrumb-active'} to="/">Home</Link></li>
        <li><Link activeClassName={'breadcrumb-active'} to="intro">Intro</Link></li>
      </ul>
    </nav>
    <main className={'row'}>
      <div className={'col-xs-12'}>
        { props.children }
      </div>
    </main>
  </div>
);


module.exports = Layout;
