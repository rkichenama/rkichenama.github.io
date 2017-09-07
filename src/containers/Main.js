import React from 'react';

import { GridLayout, GitHubProfile } from '../components';

import './Main.scss';

const Main = () => ([
  (
    <header key={'header'}>
      <GitHubProfile username='rkichenama' />
    </header>
  ),
  (
    <main key={'main'}>
      <GridLayout />
    </main>
  ),
  (
    <footer key={'footer'}>3
    </footer>
  ),
]);

export default Main;
