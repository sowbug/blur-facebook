chrome.contextMenus.create(
    { "title": "Blur Facebook",
      "documentUrlPatterns": [
        "http://www.facebook.com/*",
        "https://www.facebook.com/*"
      ],
      "onclick": function(info, tab) {
          chrome.tabs.sendRequest(tab.id,
                                  { method: "replace" });
      }});
