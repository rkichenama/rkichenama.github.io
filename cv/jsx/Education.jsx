const Education = ({span, school, degrees}) => (
  <article className={'education'}>
    <TimeSpan {...span} />
    {
      degrees.map((d, i) => (
        <article classname={'degree'} key={i}>{d}</article>
      ))
    }
    <section className={'school'}>{school}</section>
  </article>
);
