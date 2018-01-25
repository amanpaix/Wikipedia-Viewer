
function search() {
  $("#add").html(' ');
  var query = $(".form-control").val();
  var api = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + query + "&prop=info&inprop=url&utf8=&format=json";

  $.ajax({
    url: api,
    dataType: "jsonp" ,
    success: function(result) {
      console.log(result.query.searchinfo.totalhits);
      if(result.query.searchinfo.totalhits == 0) {
        displayError($(".form-control").val());
      } else {
        displayResult(result);
      }
    }
  });
}

function displayResult(result) {
  $(".notFound").hide();
  for(var i = 0; i < result.query.search.length; i++) {
    var title  = result.query.search[i].title.replace(/\s+/gi , "_");
    var loc = "https://en.wikipedia.org/wiki/" + title;
    var heading = "<h3 class='heading'> <a target='_blank' href='" + loc + "'>" + result.query.search[i].title + "</a> </h3>";
    var description = "<p class='description'>" + result.query.search[i].snippet + "</p>";
    var link = "<span class='link'>" + loc + "</span>";
    var html = "<div class='alert alert-secondary' role='alert'>" + heading + link + description + "</div>";
    $("#add").append(html);
  }
}

function displayError(keyword) {
  var line1 = "<span> Your Search - <b>" + keyword + "</b> did not match any documents.<br> <br>";
  var line2 = "<span>Suggestions:</span> <ul><li>Make sure that all words are spelled correctly.</li>  <li>Try different keywords.</li>  <li>Try more general keywords.</li></ul>"
  $(".notFound").append(line1 + line2);
  $(".notFound").show();
}

function check(e) {
  if (e.keyCode == 13) {
    search();
  }
}

$(document).ready(function() {

  $(".btn").on("click" , search);
  $(".notFound").hide();

});
