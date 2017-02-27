// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var History = require("./children/History");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

var title;
var date;
var webURL;

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return { searchTerm: "", results: "", history: [] };
    // return { searchTerm: "", results: "", history: [], deleteID: "" };
  },

  // The moment the page renders get the History
  componentDidMount: function() {
    // Get the latest history.
    helpers.getHistory().then(function(response) {
      console.log(response);
      if (response !== this.state.history) {
        console.log("History", response.data);
        this.setState({ history: response.data });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {

    // Run the query for the title
    helpers.runQuery(this.state.searchTerm).then(function(data) {
      if (data !== this.state.results) {
        console.log("Results: ", data);
        console.log("Title: " + data.snippet);
        console.log("Date: " + data.pub_date);
        console.log("URL: " + data.web_url);
        title = data.snippet;
        date = data.pub_date;
        webURL = data.web_url;

        console.log("Here is " + title + date + URL);
        this.setState({ results: data.snippet });

        // After we've received the result... then post the search term to our history.
        helpers.postHistory(title, date, webURL).then(function() {
          console.log("Updated!");

          // After we've done the post... then get the updated history
          helpers.getHistory().then(function(response) {
            console.log("Current History", response.data);

            console.log("History", response.data);

            this.setState({ history: response.data });

          }.bind(this));
        }.bind(this));
      }
    }.bind(this));
  },
/*
    helpers.deleteArticle(id).then(function() {
      console.log("Updated after deletion!");

      helpers.getHistory().then(function(response) {
        console.log("Current History", response.data);

        console.log("History", response.data);

        this.setState({ history: response.data });

      }.bind(this));
    }.bind(this));
  },
*/
  //This function allows childrens to update the parent.
  setTerm: function(term) {
    this.setState({ searchTerm: term });
  },
/*
  setTerm: function(term) {
    this.setState({ deleteID: id });
  },
*/
  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">New York Times Article Scrubber!</h2>
            <p className="text-center">
              <em>Search for and annotate articles of interest!</em>
            </p>
          </div>

          <div className="col-md-6">

            <Form setTerm={this.setTerm} />

          </div>

          <div className="col-md-6">

            <Results title={this.state.results} />

          </div>

        </div>

        <div className="row">

          <History history={this.state.history} />

        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;