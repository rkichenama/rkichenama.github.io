const Interests = ({interests = []}) => (
  <article className="interests">
    <header>Interests</header>
    {
      interests.map((interest) => (
        <Interest name={interest} />
      ))
    }
  </article>
);
