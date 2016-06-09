const
  React = require('react')
  ,FlexCol = require('./FlexCol')
  ,FlexRow = require('./FlexRow')
  ,Panel = require('./Panel')
;

require('../css/dataTree.scss');

class PersonRow extends React.Component {
  render () {
    const {person, changePerson} = this.props;
    return (
      <div className={'PersonRow'}>
        <input type="radio" name="indi-uniq" id={`indi-${person.id}`} value={person.id} onChange={changePerson} />
        <label htmlFor={`indi-${person.id}`}>{`${person.id}: ${person.data.surname}, ${person.data.givenname}`}</label>
      </div>
    );
  }
};

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
    window.focusedPersonFeed = DataStore
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
          peeps.map((person) => (
            <PersonRow key={person.id} person={person} changePerson={this._changePerson}/>
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
