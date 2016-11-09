var React = require('react');
var ReactDOM = require('react-dom');
var ReactElements = require('./ReactElements');

var Window = React.createClass({
  propTypes: {
    course: React.PropTypes.string,
    
  },
  
  render: function () {
    return (<div>
              <h1>{this.propTypes.course}</h1>
              <div>
                <h2 style={part}>Assignments</h2>
              </div>
            <br/>
              <div style={part}>
                <h2>Topics</h2>
              </div>
            </div>);
              
  }
});

ReacDOM.render(<Window />, document.getElementById('main'))
