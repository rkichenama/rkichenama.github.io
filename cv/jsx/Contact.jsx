const Contact = ({contact = [], location = ''}) => (
  <article className={'contact'}>
    <ul>
    {
      contact.map((c, i) => {
        let icon = '', title = c.substring(Math.max(c.lastIndexOf('/'), c.lastIndexOf(':')) + 1);
        switch (true) {
          case /linkedin/i.test(c): icon += 'linkedin-square'; break;
          case /facebook/i.test(c): icon += 'facebook-square'; break;
          default: icon += 'envelope'; break;
        }
        return (
          <li key={i}>
            <a href={c} title={title}><i className={'fa fa-' + icon} ariaHidden="true" /></a>
          </li>
        );
      })
    }
      <li>{location} <i className={'fa fa-map-marker'} ariaHidden="true" /></li>
    </ul>
  </article>
);
