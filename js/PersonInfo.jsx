const
  React = require('react')
  ,FlexCol = require('./FlexCol')
  ,FlexRow = require('./FlexRow')
;

require('../css/PersonInfo.scss');


module.exports = class PersonInfo extends React.Component {
  constructor () {
    super();
    this.state = {
      person: false,
    };
    ['_doUpdate'].forEach((method) => this[method].bind(this));
  }
  componentDidMount () {
    DataStore
      .filter((update) => /focusedPerson/.test(update.source))
      .map((update) => update.data)
      .distinctUntilChanged()
      .subscribe((id) => this._doUpdate(id));
    setTimeout(() => this._doUpdate('P149'), 750);
  }
  render () {
    const {
      person: {
        id = false,
        data: {
          fullname = '',
          gender = '',
          surname = '',
          givenname = '',
        } = {}
      }
    } = this.state;

    if (id)
      return (
        <article className={`personInfo gender-${gender.toLowerCase()}`}>
          <section className={'personInfo-row'}>
            <span className={'aspect'}>Family Line:</span>{surname}
          </section>
          <section className={'personInfo-row'}>
            <span className={'aspect'}>Given Name:</span>{givenname}
          </section>
          <section className={'personInfo-row'}>
            <span className={'aspect'}>Legal Name:</span>{fullname}
          </section>
        </article>
      );
    else
      return (
        <article className={'personInfo'}>
          Please select a person from the right;
        </article>
      );
  }
  _doUpdate (id) {
    const people = DataStore.get('/geno/people.json');
    if (people) {
      const person = people[id];
      this.setState({person});
    }
  }
};
