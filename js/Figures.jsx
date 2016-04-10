const
  React = require('react')
  ,FigureColumn = require('./FigureColumn')
;

require('../css/Figures.scss');

class FigureColumns extends React.Component {
  constructor () {
    super();
    this._convertToBase = this._convertToBase.bind(this);
  }
  _convertToBase (n, b) {
    if (n === 0) return [];
    return this._convertToBase(Math.floor(n / b), b).concat((n % b));
  }
  render () {
    let {value = 0, base = 10} = this.props;
    let figures = this._convertToBase(value, base);
    if (!figures.length) {
      figures = [0];
    }
    return (
      <div className={'figures'}>
      {
        figures.map((figure, i) => (
          <FigureColumn key={i} value={figure} base={base} isLastColumn={(i + 1) === figures.length} />
        ))
      }
      </div>
    );
  }
};
FigureColumns.propTypes = {
  value: React.PropTypes.number,
  base: React.PropTypes.number,
};

module.exports = FigureColumns;
