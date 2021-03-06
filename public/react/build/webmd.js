'use strict';

String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

function createMarkup() {
  return { __html: 'First &middot; Second' };
};

var WebMD = React.createClass({
  displayName: 'WebMD',

  getInitialState: function getInitialState() {
    return {
      defaultSource: '/linklist',
      items: ['home', 'editorial1', 'editorial2', 'linklist']
    };
  },
  componentDidMount: function componentDidMount() {
    var self = this;
    $.get(this.props.defaultSource, (function (result) {
      if (self.isMounted()) {
        //self.setState({data: result});
        $(self.props.defaultSource.substring(1)).html(result);
      }
    }).bind(this));
  },
  loadHtml: function loadHtml(i) {
    var self = this;
    var source = this.state.items[i];
    if ($('#' + source).html().length === 0) {
      $.ajax({
        url: '/' + source,
        cache: false,
        success: function success(data) {
          //self.setState({data: data});
          $('#' + source).append(data);
        },
        error: function error(xhr, status, err) {
          console.log(err.toString(), status);
        }
      });
    } else {
      $('#' + source).fadeIn(200);
    }
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'ul',
        { className: 'nav nav-tabs', role: 'tablist', id: 'tabs' },
        this.state.items.map(function (li, i) {
          return React.createElement(
            'li',
            { role: 'presentation', className: i === 0 && "active", key: 'presentation-' + i,
              onClick: this.loadHtml.bind(this, i) },
            React.createElement(
              'a',
              { href: '#' + li, 'aria-controls': li, role: 'tab', 'data-toggle': 'tab' },
              li.capitalizeFirstLetter()
            )
          );
        }, this)
      ),
      React.createElement(
        'div',
        { className: 'tab-content' },
        this.state.items.map(function (tab, i) {
          return React.createElement('div', { role: 'tabpanel', className: i === 0 ? "tab-pane active" : "tab-pane", id: tab,
            key: 'tabpanel-' + i });
        }, this)
      )
    );
  }
});

/**
 * localhost:3000/linklist, editorial1, editorial2
 */
ReactDOM.render(React.createElement(WebMD, { defaultSource: '/linklist' }), document.getElementById('ContentPane1'));
