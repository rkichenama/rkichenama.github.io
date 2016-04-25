const Skill = (props) => (
  <row className={'skill'}>
    <column className={'skill-name'}>
      {props.name}
    </column>
    <column className={'skill-bar'}>
      <Bar {...props} />
    </column>
  </row>
);
