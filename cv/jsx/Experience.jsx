const Experience = ({span, location, title, company, accomplisments = []}) => (
  <article className={'experience'}>
    <section>
      <TimeSpan {...span} />
      <section className={'location'}>{location}</section>
      <section className={'title'}>{title}</section>
      <section className={'company'}>{company}</section>
      <section className={'accomplishments'}>
        <ul>
        {
          accomplisments.map((a, i) => (
            <li key={i} className={'accomplishment'}>{a}</li>
          ))
        }
        </ul>
      </section>
    </section>

  </article>
);
