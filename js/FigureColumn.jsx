const
  React = require('react')
  ,ReactDOM = require('react-dom')
;

require('../css/Figure.scss');

const animateFn = (glyphs, frames, isSpecial) => {
  let top = 0, len = glyphs.length - 1;
  return (frame, height) => {
    top = ((height * len) / frames) * -frame;
    glyphs.forEach((glyph, i) => {
      glyph.style.top = (top + (height * i)).toString() + 'px';
    });
    /*istanbul ignore if - cannot change top during test due to no styles */
    if(isSpecial && (-top > height)) {
      let t = glyphs[0];
      glyphs[0] = glyphs[len];
      glyphs[len] = t;
      isSpecial = false;
    }
  };
};
const prep = (a, i, figure) => {
  let glyph = ReactDOM.findDOMNode(figure.refs['glyph' + i]);
  glyph.setAttribute('class', 'current');
  a.push(glyph);
  return a;
};
const cleanUp = (figure) => ( (g, i) => {
  let glyph = ReactDOM.findDOMNode(figure.refs['glyph' + i]);
  glyph.setAttribute('class', '');
  if (i === figure.props.value) {
    glyph.setAttribute('class', 'current');
    glyph.style.top = '0';
  }
} );

class Glyph extends React.Component {
  render () {
    let {glyph = 0, current = false} = this.props;
    return (
      <figure className={current ? 'current' : ''}>
        <mark>
          {glyph}
        </mark>
      </figure>
    );
  }
}

class FigureColumn extends React.Component {
  constructor () {
    super();
    this._rollingList = this._rollingList.bind(this);
    this._specialList = this._specialList.bind(this);
    this._doAnimation = this._doAnimation.bind(this);
    this.frames = 12;
    this.state = {
      glyphs: FigureColumn.defaultGlyphs,
      value: 0,
      shouldAnimate: true,
      animationFn: () => {},
    };
  }
  componentWillMount () {
    let {glyphs, value} = this.props;
    if (glyphs) {
      this.setState({glyphs: glyphs});
    }
    if (value) {
      this.setState({value: value});
    }
  }
  componentDidMount () {}
  componentWillUpdate (nextProps) {
    if (this.props !== nextProps) {
      // this.setState({
      //   previous: this.state.current,
      //   current: nextProps.from || 0,
      // });
    }
  }
  componentDidUpdate (prevProps) {
    if (this.props !== prevProps) {
      // prep Animation
      let arr = [];
      let {value} = this.state;
      let
        {value: next, base = 10, isLastColumn} = this.props
      ;
      let isSpecial = false;
      if (isLastColumn && value === next) {
        arr = this._specialList(next, value, base);
        isSpecial = true;
      } else {
        arr = this._rollingList(next, value, base);
      }

      let figure = this;
      this.setState({
        animationFn: animateFn(arr, this.frames, isSpecial),
        interval: requestAnimationFrame(function () {
          if (arr.length) {
            figure._doAnimation(0);
          }
        }),
      });
    }
  }
  _rollingList (to, i, base) {
    let arr = [];
    while (i != to) {
      arr = prep(arr, i, this);
      i = ((i + 1) % base);
    }
    return prep(arr, to, this);
  }
  _specialList (to, i, base) {
    let arr = prep([], i, this);
    i = ((i + 1) % base);
    arr = arr.concat(this._rollingList(to, i, base));
    // add blank placeholder
    arr.push(this.refs.spare);
    return arr;
  }
  _doAnimation (frame) {
    let figure = this;
    if (figure.state.shouldAnimate && frame++ < this.frames) {
      let
        current = ReactDOM.findDOMNode(figure.refs['glyph' + figure.state.value]),
        height = current.getBoundingClientRect().height,
        animateFn = figure.state.animationFn
      ;
      // check if the component has set state yet
      if (/function/i.test(typeof(animateFn))) {
        animateFn(frame, height);
      }
      requestAnimationFrame(function () { figure._doAnimation(frame); });
      // setTimeout(function () { figure._doAnimation(frame); }, 250);
    } else {
      let cleaner = cleanUp(figure);
      this.state.glyphs
        .forEach(cleaner);
      figure.setState({value: figure.props.value});
    }
  }
  render () {
    let {glyphs, value} = this.state;
    return (
      <div className={'figure'}>{/* comma */}
        <div className={'figure-window'}>
          {glyphs.map((glyph, i) => (<Glyph ref={'glyph' + i} key={i} glyph={glyph} current={i === value}/>))}
          <figure ref="spare"></figure>
        </div>
      </div>
    );
  }
};
FigureColumn.defaultGlyphs = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
FigureColumn.propTypes = {
  glyphs: React.PropTypes.array,
  value: React.PropTypes.number,
  next: React.PropTypes.number,
  base: React.PropTypes.number,
  isLastColumn: React.PropTypes.bool,
};
FigureColumn.defaultProps = {
  base: 10,
  value: 0,
  isLastColumn: false,
};

module.exports = FigureColumn;
