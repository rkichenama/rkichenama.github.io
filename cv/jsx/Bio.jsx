const Bio = ({name, statement}) => (
  <article className={'bio'}>
    <section className="title">{name}</section>
    <section className="statement">{statement}</section>
  </article>
)
