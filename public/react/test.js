var Timer = React.createClass({
  displayName: '',
  minxins: [],
  statics: {},
  propTypes: {},
  getDefaultProps: function () {
  },
  getInitialState: function () {
    return {secondsElapsed: 0};
  },
  componentWillMount: function () {
  },
  tick: function () {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  },
  componentDidMount: function () {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function () {
    clearInterval(this.interval);
  },
  handleClick: function () {
  },
  render: function () {
    return (
      <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
    );
  }
});

ReactDOM.render(<Timer />, document.getElementById('timer'));


///////////////
function log(str) {
  document.getElementById('log').innerHTML += '<p>' + str + '</p>';
}
document.getElementById('clear').onclick = function () {
  document.getElementById('log').innerHTML = '';
};

var Test = React.createClass({
  getInitialState() {
    log('getInitialState');
    return {
      value: this.props.value
    };
  },

  componentWillReceiveProps(nextProps){
    log('componentWillReceiveProps');
    this.setState({
      value: nextProps.value
    });
  },

  shouldComponentUpdate(nextProps, nextState){
    log('shouldComponentUpdate');
    return true;
  },

  componentWillUpdate(nextProps, nextState){
    log('componentWillUpdate');
  },

  componentWillMount(){
    log('componentWillMount');
  },

  render() {
    log('render');
    return <span>{this.props.value}</span>
  },

  componentDidMount() {
    log('componentDidMount');
  },

  componentDidUpdate(prevProps, prevState) {
    log('componentDidUpdate');
  },

  componentWillUnmount(prevProps, prevState) {
    log('componentWillUnmount');
  }
});


var Hello = React.createClass({
  getInitialState() {
    return {
      value: 1,
      destroyed: false
    };
  },
  increase() {
    this.setState({
      value: this.state.value + 1
    });
  },
  destroy() {
    this.setState({
      destroyed: true
    });
  },
  render: function () {
    if (this.state.destroyed) {
      return null;
    }
    return <div>
      <p>
        <button onClick={this.increase}>increase</button>
        <button onClick={this.destroy}>destroy</button>
      </p>
      <Test value={this.state.value}/>
    </div>;
  }
});

ReactDOM.render(<Hello />, document.getElementById('test'));

