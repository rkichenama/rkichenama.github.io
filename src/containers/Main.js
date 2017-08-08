import React from 'react';

import { GridLayout } from '../components';

import './Main.scss';

const Main = () => ([
  (
    <header key={'header'}>1
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
