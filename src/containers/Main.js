import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { GridLayout, GitHubProfile, Menu, PageFooter } from '../components';
import routes from '../routes';

import './Main.scss';

const Main = () => ([
  (
    <header key={'header'}>
      <div className='cell half sixth'>
        <h1>title</h1>
      </div>
      <GitHubProfile username='rkichenama' className='cell third' />
    </header>
  ),
  (
    <main key={'main'}>
      <Menu />
      <Switch>
        {
          routes
            .map(({path, component}) => (<Route {...{path, component}} />))
        }
      </Switch>
    </main>
  ),
  (
    <PageFooter key={'footer'} />
  ),
]);

const Wrapped = () => (<Router><Main /></Router>);
Wrapped.displayName = 'Router(Main)';

export default Wrapped;
