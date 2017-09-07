import React from 'react';

const classNames = [
  'cell',
  'cell sixth',
  'cell quarter',
  'cell third',
  'cell quarter sixth',
  'cell half',
  'cell quarter third',
  'cell half sixth',
  'cell half quarter',
  'cell half third',
  'cell half quarter sixth',
  'cell full',
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
