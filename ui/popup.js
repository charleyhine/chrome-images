var Popup = {
  init: function() {
    $("#show-button").click(function() { Popup.showElements(); });
    $("#hide-button").click(function() { Popup.hideElements(); });
    $("#get-button").click(function() { Popup.getImages(); });
  },

  showElements: function() {
    var value = $("#search-query").val();
    this.sendMessage("show", value);
  },

  hideElements: function() {
    var value = $("#search-query").val();
    this.sendMessage("hide", value);
  },

  getImages: function() {
    $("#result-box").empty();
    this.sendMessage("get", "img", function(result) {
      $.each(result, function(index, image) {
        var img = $("<img>").attr("src", image['url']).attr("width", "100px").attr("height", "100px");
				var link = $("<a>").attr("href", '/').attr("title", image['title']);
				link.html(img);
				$("#result-box").append(link);
      });
    });
  },

  sendMessage: function(action, value, callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: action, element: value}, function(response) {
        if (callback) {
          callback(response.result);
        }
      });
    });
  }
};

$(document).ready(function() { Popup.init(); });
