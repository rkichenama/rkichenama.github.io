class D3Component extends React.Component {
  constructor () {
    super();
    this._bind(...['_renderD3', '_updateD3', '_centerG']);
    this.className = 'd3component';
    this.XResolution = 600;
    this.YResolution = 600;
  }
  _bind (...methods) {
    for (let method of methods) {
      this[method].bind(this);
    }
  }
  // invoked once, both on the client and server, immediately before the initial rendering occurs
  componentWillMount () { this._renderD3(); }
  // invoked when a component is receiving new props; this method is not called for the initial render
  componentWillReceiveProps (nextProps) { this._renderD3(nextProps); }
  // invoked immediately after the component's updates are flushed to the DOM; this method is not called for the initial render
  componentDidUpdate (/*prevProps, prevState*/) { this._updateD3(); }
  // invoked once, only on the client, immediately after the initial rendering occurs
  componentDidMount () { this._updateD3(); }

  // invoked before rendering when new props or state are being received
  shouldComponentUpdate (nextProps/*, nextState*/) { return (nextProps.data !== this.props.data); }

  render () {
    return (
      <div className={this.className}>
        <svg ref={ (d) => this._svg = d }
          preserveAspectRatio="xMinYMin meet"
          viewBox={`0 0 ${this.XResolution} ${this.YResolution}`}>
        </svg>
      </div>
    );
  }

  /*
  occurs when a component is receiving new props or immediately before the initial rendering occurs
  expect extending component to override this
  */
  _renderD3 (props = this.props) {
    // create the d3 functions needed
  }
  /*
  occurs immediately after the initial rendering or immediately after the component's updates are flushed to the DOM
  expect extending component to override this
  */
  _updateD3 () {
    // execute the d3 render
  }

  /*
  @return {object} - g element appended to this._svg
  */
  _centerG () {
    return d3.select(this._svg)
      .append('g')
      .attr('transform', `translate(${this.XResolution / 2}, ${this.YResolution / 2})`);
  }
};
D3Component.propTypes = {
  data: React.PropTypes.array.isRequired,
};
