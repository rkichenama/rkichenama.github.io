const
  React = require('react')
  ,FlexRow = require('./FlexRow')
  ,FlexCol = require('./FlexCol')
  ,HackerNews = require('./HackerNews')
  ,DataTree = require('./DataTree')
  ,Loading = require('./Loading')
;

require('../css/deck.scss');

class Panel extends React.Component {
  render () {
    return (<div className={'panel'}>{this.props.children}</div>);
  }
}

module.exports = class Index extends React.Component {
  render () {
    const comps = [
      [
        <HackerNews key={`news00`} />,
        <HackerNews key={`news01`} />,
        <HackerNews key={`news10`} />,
        <HackerNews key={`news11`} />,
      ],
      [
        <HackerNews key={`news3`} />,
        <HackerNews key={`news4`} />,
        <HackerNews key={`news5`} />,
      ],
    ];
    return (
      <div className={'index'}>
        <FlexRow>
          <FlexCol>
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
          <FlexCol className={'data'} style={{maxWidth: '300px'}}>
            <Panel>
              <DataTree />
            </Panel>
          </FlexCol>
        </FlexRow>


      </div>
    );
  }
};
