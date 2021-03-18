import React from 'react';
import { render } from 'react-dom';
import Landing from './Landing';

(async () => {
  const fauxElement = document.createElement('main');
  document.body.appendChild(fauxElement);

  render(
    <Landing />,
    fauxElement
  );
})();
