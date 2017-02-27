// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// NY Times API
var nytimesAPIkey = "9d56c2f694504756913253708013fb73";

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(title) {

    console.log(title);

    // Figure out the article search
    var queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + title + "&&api-key=" + nytimesAPIkey;
    // http://api.nytimes.com/svc/search/v2/articlesearch.json?q=smoking&&api-key=9d56c2f694504756913253708013fb73
    return axios.get(queryURL).then(function(results) {
      // If get get a result, return that result's formatted title property
      if (results.data.response.docs[0]) {
        console.log("Results: " + results.data.response.docs[0]);
        return results.data.response.docs[0];
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },

  // This function hits our own server to retrieve the record of query results
  getHistory: function() {
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  postHistory: function(title, date, url) {
    return axios.post("/api", { title: title, date: date, url: url });
  },

  deleteArticle: function(id) {
    return axios.delete("/api", { id: id });
  } 
};

// We export the API helper
module.exports = helper;