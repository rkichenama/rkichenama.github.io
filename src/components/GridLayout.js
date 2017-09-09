import React from 'react';

const classNames = [
  'panel cell',
  'panel cell sixth',
  'panel cell quarter',
  'panel cell third',
  'panel cell quarter sixth',
  'panel cell half',
  'panel cell quarter third',
  'panel cell half sixth',
  'panel cell half quarter',
  'panel cell half third',
  'panel cell half quarter sixth',
  'panel cell full',
];

const GridLayout = () => (classNames.map((className, i) => {
  const list = [];
  const I = i + 1;
  const blanks = 12 % I;
  for (let x = 0; x < ((12 - blanks) / I); x++)
    list.push(<div key={`${i}-${x}`} {...{className}}></div>);
  if (blanks)
    list.push(<div key={`${i}-${blanks}-b`} value className={classNames[blanks - 1]}></div>)
  return list;
}));

export default GridLayout;
