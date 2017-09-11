/*
export nesting routing
*/
import React from 'react';
import { GridLayout } from '../components';

export default [
  { path: '/something', title: 'something', component: () => (<div>something</div>) },
  { path: '/another', title: 'another', component: () => (<div>another</div>) },
  { path: '/again', title: 'again', component: () => (<div>again</div>) },
  { component: GridLayout },
];
