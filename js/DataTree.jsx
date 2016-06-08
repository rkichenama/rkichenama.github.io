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
      indi: {
        "P4": {
          "id": "P4",
          "data": {
            "surname": "Pitts",
            "givenname": "Amanda Louise",
            "fullname": "Amanda Louise Pitts",
            "gender": "F",
            "familyIds": [
              "F24",
              "F1"
            ],
            "children": []
          }
        },
        "P1": {
          "id": "P1",
          "data": {
            "surname": "Kichenama",
            "givenname": "Richard",
            "fullname": "Richard Kichenama",
            "gender": "M",
            "familyIds": [
              "F35",
              "F1"
            ],
            "children": []
          }
        },
        "P2": {
          "id": "P2",
          "data": {
            "surname": "Smith",
            "givenname": "Richard",
            "fullname": "Richard Smith",
            "gender": "M",
            "familyIds": [
              "F34",
              "F35"
            ],
            "children": []
          }
        },
        "P3": {
          "id": "P3",
          "data": {
            "surname": "Kichenama",
            "givenname": "Carmen",
            "fullname": "Carmen Kichenama",
            "gender": "F",
            "familyIds": [
              "F14",
              "F8",
              "F35"
            ],
            "children": []
          }
        },
        "P5": {
          "id": "P5",
          "data": {
            "surname": "Addams",
            "givenname": "Leechelle",
            "fullname": "Leechelle Addams",
            "gender": "F",
            "familyIds": [
              "F2"
            ],
            "children": []
          }
        },
        "P6": {
          "id": "P6",
          "data": {
            "surname": "Addams",
            "givenname": "Michael",
            "fullname": "Michael Addams",
            "gender": "M",
            "familyIds": [
              "F2"
            ],
            "children": []
          }
        },
        "P7": {
          "id": "P7",
          "data": {
            "surname": "Rufen-Blanchette",
            "givenname": "Camile",
            "fullname": "Camile Rufen-Blanchette",
            "gender": "F",
            "familyIds": [
              "F367",
              "F2"
            ],
            "children": []
          }
        },
        "P8": {
          "id": "P8",
          "data": {
            "surname": "Angivin",
            "givenname": "",
            "fullname": "Angivin",
            "gender": "M",
            "familyIds": [
              "F3"
            ],
            "children": []
          }
        },
        "P9": {
          "id": "P9",
          "data": {
            "surname": "Rufen-Blanchette",
            "givenname": "Susanne",
            "fullname": "Susanne Rufen-Blanchette",
            "gender": "F",
            "familyIds": [
              "F368",
              "F3",
              "F367"
            ],
            "children": []
          }
        },
        "P10": {
          "id": "P10",
          "data": {
            "surname": "Angivin",
            "givenname": "Abigail",
            "fullname": "Abigail Angivin",
            "gender": "F",
            "familyIds": [
              "F3",
              "F369"
            ],
            "children": []
          }
        },
        "P11": {
          "id": "P11",
          "data": {
            "surname": "Angivin",
            "givenname": "Marcus",
            "fullname": "Marcus Angivin",
            "gender": "M",
            "familyIds": [
              "F3"
            ],
            "children": []
          }
        },
        "P12": {
          "id": "P12",
          "data": {
            "surname": "Angivin",
            "givenname": "Maurice",
            "fullname": "Maurice Angivin",
            "gender": "M",
            "familyIds": [
              "F3",
              "F5"
            ],
            "children": []
          }
        },
      },
      fam: [],
    }
  }
  componentDidMount () {
    // subscribe to updates
    DataStore.fetch('/geno/people.json')
      .then((indi) => this.setState({indi}));
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
              <div key={person.id}>{`${person.id}: ${person.data.surname}, ${person.data.givenname}`}</div>
            ))
        }
        </Panel>
        <Panel className={'dataTree-families'}>
        </Panel>
      </FlexCol>
    );
  }
};
