var DOMScript = {
  init: function() {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      DOMScript.processRequest(request, sender, sendResponse);
    });
  },

  processRequest: function(request, sender, sendResponse) {
    switch (request.action) {
      case "show":
        $(request.element).show();
        sendResponse({});
        break;
      case "hide":
        $(request.element).hide();
        sendResponse({});
        break;
      case "get":
        var list = [];
				var title = $("h1").text();
				if (!window.location.origin){ window.location.origin = window.location.protocol+"//"+window.location.host; }
        $.each($(request.element), function(index, item) {
					var src = $(item).attr("src")
					var pat = /^https?:\/\//i;
					if (!pat.test(src)){ src = window.location.origin + '/' + src; }
					list.push({url: src, title: title});
        });
        sendResponse({result: list});
    }
  }
};

DOMScript.init();