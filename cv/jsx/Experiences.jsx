const Experiences = ({response = []}) => (
  <article className={'experiences'}>
    <header>Work Experiences</header>
    {
      response
        .slice(0, 4)
        .map((e, i) => (
          <Experience key={i} {...e} />
        ))
    }
  </article>
);
