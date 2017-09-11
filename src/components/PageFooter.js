import React from 'react';

const themes = [
  'light',
  'blues',
  'dark-2',
  'dark',
];

const switchTheme = ({ target: {value : theme}}) => { document.body.className = theme; };

const PageFooter = () => (
  <footer>
    <div className='cell full text-center'>
      Mostly harmless
      <select onChange={switchTheme} defaultValue='light' >
        {
          themes.map(theme => (<option key={theme}>{theme}</option>))
        }
      </select>
    </div>
  </footer>
);

export default PageFooter;
