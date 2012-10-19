function onClickHandler(info, tab) {
  if (info.menuItemId == "blur") {
    chrome.tabs.executeScript(tab.id, { file: "jquery-1.8.2.min.js" },
    function() {
      chrome.tabs.executeScript(tab.id, { file: "blur_facebook.js" });
    });
  }
}
chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({ "title": "Blur Facebook",
    "documentUrlPatterns": [
      "http://www.facebook.com/*",
      "https://www.facebook.com/*",
    ],
    "id": "blur"});
});
