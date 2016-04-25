const Skills = ({skills = []}) => (
  <article className={'skills'}>
    <header>Skills</header>
    {
      skills
        .sort((a, b) => {
          switch(true) {
            case a.name.toLowerCase() < b.name.toLowerCase(): return -1;
            case a.name.toLowerCase() > b.name.toLowerCase(): return +1;
            default: return 0;
          }
        })
        .map((skill) => (
          <Skill {...skill} />
        ))
    }
  </article>
);
