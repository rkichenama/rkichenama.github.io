const
  React = require('react')
  ,ReactDOM = require('react-dom')
  ,{Router, Route, IndexRoute, hashHistory} = require('react-router')
  ,Layout = require('./Layout')
  ,Index = require('./Index')
  ,Intro = require('./Intro')
;

const App = () => (
  <Router history={hashHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Index} />
      <Route path="intro" component={Intro} />
      <Route path="*" component={Index} />
    </Route>
  </Router>
);

ReactDOM.render(<App />, document.querySelector('#app'));
