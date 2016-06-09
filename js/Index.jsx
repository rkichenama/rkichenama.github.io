const
  React = require('react')
  ,FlexRow = require('./FlexRow')
  ,FlexCol = require('./FlexCol')
  ,HackerNews = require('./HackerNews')
  ,DataTree = require('./DataTree')
  ,Loading = require('./Loading')
  ,Panel = require('./Panel')
  ,DataStore = require('./datastore')
  ,PersonInfo = require('./PersonInfo')
;

require('../css/deck.scss');

window.DataStore = new DataStore(false);
// window.DataStore = new DataStore(true);

const randNum = () => Math.floor(Math.random() * 255);
const randClr = () => `rgba(${randNum()},${randNum()},${randNum()},.4)`;

module.exports = class Index extends React.Component {
  render () {
    const comps = [
      [ <PersonInfo />, <Loading fillColor={randClr()}/> ],
      [ <Loading fillColor={randClr()}/>, <Loading fillColor={randClr()}/>, <Loading fillColor={randClr()}/>, <Loading fillColor={randClr()}/>, <Loading fillColor={randClr()}/>, <Loading fillColor={randClr()}/>, <Loading fillColor={randClr()}/>, <Loading fillColor={randClr()}/> ],
      [ <Loading fillColor={randClr()}/>, <Loading fillColor={randClr()}/>, <Loading fillColor={randClr()}/> ],
      // [
      //   <HackerNews key={`news00`} />,
      //   <HackerNews key={`news01`} />,
      //   <HackerNews key={`news10`} />,
      //   <HackerNews key={`news11`} />,
      // ],
      // [
      //   <HackerNews key={`news3`} />,
      //   <HackerNews key={`news4`} />,
      //   <HackerNews key={`news5`} />,
      // ],
    ];
    return (
      <div className={'index'}>
        <FlexRow>
          <FlexCol className={'printable'}>
            {
              comps.map((row, r) => (
                <FlexRow key={`row${r}`}>
                  {
                    row.map((col, c) => (
                      <FlexCol key={`col${c}`}>
                        <Panel>{col}</Panel>
                      </FlexCol>
                    ))
                  }
                </FlexRow>
              ))
            }
          </FlexCol>
          <DataTree />
        </FlexRow>


      </div>
    );
  }
};
