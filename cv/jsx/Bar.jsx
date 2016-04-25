/*
if no props are sent in, props are {} and show scale
*/
const Bar = ({ranking = 0, scale = 10}) => {
  let content, isScale = false;
  let tickMarks = [];
  for (let i = 1; i < scale; i++) {
    tickMarks.push(<div key={i} className={'bar-ticks'}
      style={{width: (i * 100 / scale).toString() + '%'}}></div>);
  }

  return (
    <section className={'bar'}>
      {tickMarks}
      <article title={ranking} className={'bar-value'} style={{width: (ranking * 100 / scale).toString() + '%'}} />
    </section>
  );
};
