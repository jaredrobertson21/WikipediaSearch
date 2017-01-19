var api = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srprop=snippet&origin=*&srsearch=";
var searchQuery = "";
var queryData = {};
var url = "";

function searchRequest() {
  var splitURL = window.location.href.split("=", 2);
  searchQuery = splitURL[1];
  console.log(searchQuery);
  if (typeof searchQuery === "undefined" || searchQuery === "") {
    return false;
  } else if (searchQuery === "Special%3ARandom") {
    console.log("Random");
    return true;
  } else {
    url = api + searchQuery;
    $.ajax( {
      url: url,
      data: queryData,
      dataType: "json",
      type: "GET",
      headers: {"Api-User-Agent": "Freecodecamp Project - jared.robertson@usask.ca"},
      success: function(data) {
        populateSearch(data);
      }
    });
    return true;
  }
}

function populateSearch(json) {
  var snippet = "";
  var title = "";
  var urlTitle = "";
  var i = 0;
  jQuery.each(json["query"]["search"], function() {
    snippet = json["query"]["search"][i]["snippet"];
    title = json["query"]["search"][i]["title"];

    $("#results").append("<a href='https://en.wikipedia.org/wiki/" + title + "' target='blank'><div class='article title'>"
    + title + "<div class='content'><p>" + snippet + "...</p></div></div></a>");
    i++;
  });

}

searchRequest();
