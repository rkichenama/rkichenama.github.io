const Educations = ({education = []}) => (
  <article className={'educations'}>
    <header>Education</header>
    {
      education.map((e, i) => {

        return (
          <Education key={i} {...e} />
        );
      })
    }
  </article>
);
