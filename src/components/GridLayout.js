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
/*
1 [class='']
2 .sixth
3 .quarter
4 .third
5 .quarter.sixth
6 .half
7 .quarter.third
8 .half.sixth
9 .half.quarter
10 .half.third
11 .half.quarter.sixth
12 .full

 */

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
