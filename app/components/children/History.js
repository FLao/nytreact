// Include React
var React = require("react");

// This is the History component. It will be used to show a log of  recent searches.
var Article = React.createClass({

/*
  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { id: "" };
  },

   // This function will respond to the user input
  handleChange: function(event) {

    this.setState({ id: event.target.data-id });

  },

  handleDelete: function(event) {
    this.props.setID(this.state.id);
    this.setState({ id: "" });
  },

  <button id="deleteArticle" data-id={search._id} onClick={this.handleDelete}>Delete</button></p>
*/

  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Saved Articles</h3>
        </div>
        <div className="panel-body text-center">

          {/* Here we use a map function to loop through an array in JSX */}
          {this.props.history.map(function(search, i) {
            return (
              <p key={i}>{search.title} - {search.date} - {search.url} - {search._id}</p>
               
            );
          })}
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Article;
