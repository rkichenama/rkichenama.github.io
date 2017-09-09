import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { GridLayout, GitHubProfile, Menu } from '../components';

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
        <Route>
          <GridLayout />
        </Route>
      </Switch>
    </main>
  ),
  (
    <footer key={'footer'}>
      <div className='cell full text-center'>
        Mostly harmless
      </div>
    </footer>
  ),
]);

export default () => (<Router><Main /></Router>);
