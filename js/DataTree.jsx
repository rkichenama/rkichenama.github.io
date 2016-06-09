const
  React = require('react')
  ,FlexCol = require('./FlexCol')
  ,FlexRow = require('./FlexRow')
  ,Panel = require('./Panel')
;

require('../css/dataTree.scss');

module.exports = class DataTree extends React.Component {
  constructor () {
    super();
    this.state = {
      indi: {},
      fam: {},
    };
    ['_changePerson'].forEach((method) => this[method].bind(this));
  }
  componentDidMount () {
    // subscribe to updates
    DataStore.fetch('/geno/people.json')
      .then((indi) => this.setState({indi}));
    this.feed = DataStore
      .filter((update) => /focusedPerson/.test(update.source))
      .map((update) => update.data)
      .distinctUntilChanged()
      // .subscribe((x) => console.log(x) )
    ;
  }
  render () {
    let peeps = Object.keys(this.state.indi)
      .map((key) => this.state.indi[key])
      .sort((a, b) => {
        if (a.data.surname == b.data.surname) {
          return a.data.givenname == b.data.givenname ? 0 : (a.data.givenname < b.data.givenname ? -1 : 1);
        } else {
          return (a.data.surname < b.data.surname ? -1 : 1);
        }
      });

    return (
      <FlexCol className={'dataTree'} style={{maxWidth: '300px'}}>
        <Panel className={'dataTree-people'}>
        {
          peeps
            .map((person) => (
              <div key={person.id}>
                <input type="radio" name="indi-uniq" id={`indi-${person.id}`} value={person.id} onChange={this._changePerson} />
                <label htmlFor={`indi-${person.id}`}>{`${person.id}: ${person.data.surname}, ${person.data.givenname}`}</label>
                {/*<section>{`${person.id}: ${person.data.surname}, ${person.data.givenname}`}</section>*/}
              </div>
            ))
        }
        </Panel>
        <Panel className={'dataTree-families'}>
        </Panel>
      </FlexCol>
    );
  }
  _changePerson (evt) {
    let {value} = evt.target;
    DataStore.put('focusedPerson', value);
  }
};
