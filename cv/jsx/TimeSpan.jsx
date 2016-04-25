const TimeSpan = ({begins = {}, ends}) => {
  let sm = pad(begins.m), em = pad(ends.m);
  [sm, em] = [sm, em].map((v) => v.length ? v + '/' : v );
  return (
    <article className={'timespan'}>
      {begins ? (sm + begins.y + ' - ') : ''}
      {em + ends.y}
    </article>
  );
};
