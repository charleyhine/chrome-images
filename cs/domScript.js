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
				var price = "0"

				// find largest price
				var price_regex = /(\$[0-9]+(\.[0-9]{2})?)/g;
				var prices = $('body').text().match(price_regex);
				if (prices != null){
					prices = $.map( prices, function( p ) {
					  return p.substring(1);
					});
					price = Math.max.apply(Math, prices);
				}

				if (!window.location.origin){ window.location.origin = window.location.protocol+"//"+window.location.host; }

				$.each($(request.element), function(index, item) {
					if ($(item)[0].width > 140 && $(item)[0].height > 140){
						var src = $(item).attr("src");
						var pat = /^https?:\/\//i;
						if (!pat.test(src)){ src = window.location.origin + '/' + src; }
						list.push({url: src, title: title, price: price});
					}
        });
        sendResponse({result: list});
    }
  }
};

DOMScript.init();