'use strict';

var Timer = React.createClass({
  displayName: 'Timer',

  getInitialState: function getInitialState() {
    return { secondsElapsed: 0 };
  },
  tick: function tick() {
    this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
  },
  componentDidMount: function componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function componentWillUnmount() {
    clearInterval(this.interval);
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      'Seconds Elapsed: ',
      this.state.secondsElapsed
    );
  }
});

ReactDOM.render(React.createElement(Timer, null), document.getElementById('timer'));

///////////////
function log(str) {
  document.getElementById('log').innerHTML += '<p>' + str + '</p>';
}
document.getElementById('clear').onclick = function () {
  document.getElementById('log').innerHTML = '';
};

var Test = React.createClass({
  displayName: 'Test',
  getInitialState: function getInitialState() {
    log('getInitialState');
    return {
      value: this.props.value
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    log('componentWillReceiveProps');
    this.setState({
      value: nextProps.value
    });
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    log('shouldComponentUpdate');
    return true;
  },
  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
    log('componentWillUpdate');
  },
  componentWillMount: function componentWillMount() {
    log('componentWillMount');
  },
  render: function render() {
    log('render');
    return React.createElement(
      'span',
      null,
      this.props.value
    );
  },
  componentDidMount: function componentDidMount() {
    log('componentDidMount');
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    log('componentDidUpdate');
  },
  componentWillUnmount: function componentWillUnmount(prevProps, prevState) {
    log('componentWillUnmount');
  }
});

var Hello = React.createClass({
  displayName: 'Hello',
  getInitialState: function getInitialState() {
    return {
      value: 1,
      destroyed: false
    };
  },
  increase: function increase() {
    this.setState({
      value: this.state.value + 1
    });
  },
  destroy: function destroy() {
    this.setState({
      destroyed: true
    });
  },

  render: function render() {
    if (this.state.destroyed) {
      return null;
    }
    return React.createElement(
      'div',
      null,
      React.createElement(
        'p',
        null,
        React.createElement(
          'button',
          { onClick: this.increase },
          'increase'
        ),
        React.createElement(
          'button',
          { onClick: this.destroy },
          'destroy'
        )
      ),
      React.createElement(Test, { value: this.state.value })
    );
  }
});

ReactDOM.render(React.createElement(Hello, null), document.getElementById('test'));
