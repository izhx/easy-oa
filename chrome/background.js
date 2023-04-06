// Add the back to abstract button.

const mlrPressRegex = /\/[^\/]+$/;
let tabTitles = {};


function openAbstract(newUrl) {
  const newTab = false;
  if (newTab) {
    chrome.tabs.create({ url: newUrl });
  } else {
    chrome.tabs.update(null, { url: newUrl });
  }
}


function isPdf(url) {
  if (url.startsWith("http") && !url.endsWith(".pdf")) {
    if (url.includes("openreview.net/pdf?id=")) {
      return true;
    }
    return false;
  }
  return true;
}


chrome.runtime.onInstalled.addListener(() => {
});


// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (isPdf(tab.url)) {
    chrome.action.enable(tabId);
    if (changeInfo.status === 'complete'){
      chrome.tabs.sendMessage(tabId, {tab: tab, message: 'complete'});
    }

    // console.log(tabId, 'changeInfo', changeInfo);
    if (tabTitles[tab.id] !== undefined && changeInfo.title !== undefined){
      if (changeInfo.title !== tabTitles[tab.id] && changeInfo.title !== tab.url) {
        // For PDF page in Chrome, changing the tab title will result in
        // a intermediate title that is the tab's url.
        // Hence, we ignore the change that is the same as the tab's url.
        console.log(tabId, 'changeInfo before changeTitle', changeInfo);
        chrome.tabs.sendMessage(tabId, {tab: tab, message: 'changeTitle'});
        }
    }
  } else {
    chrome.action.disable(tabId);
  }
});


// Save the loaded paper title to the `tabTitles` object.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'titleLoaded') {
    console.log('title loaded', request);
    tabTitles[sender.tab.id] = request.title;
    chrome.tabs.sendMessage(sender.tab.id, {tab: sender.tab, message: 'changeTitle'});
  }
});


// Remove the saved title when the tab is closed.
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  if (isPdf(tab.url)) delete tabTitles[tabId];
});


// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
  // back to abstract page
  var url = tab.url;

  if (!url.endsWith(".pdf")) {
    if (url.includes("openreview.net/pdf?id=")) {
      openAbstract(url.replace("net/pdf?", "net/forum?"));
    }

    return;
  }

  if (url.includes("arxiv.org/pdf/")) {
    openAbstract(url
      .replace(".pdf", "")
      .replace("/pdf/", "/abs/")
    );

  } else if (url.includes("aclanthology.org/")) {
    openAbstract(url.replace(".pdf", ""))

  } else if (url.includes("openaccess.thecvf.com/content/")) {
    openAbstract(url
      .replace(".pdf", ".html")
      .replace("/papers/", "/html/")
    )

  } else if (url.includes("proceedings.mlr.press")) {
    openAbstract(url.replace(mlrPressRegex, ""))

  } else if (url.includes("papers.nips.cc/paper_files")) {
    openAbstract(url
      .replace(".pdf", ".html")
      .replace("-Paper", "-Abstract")
      .replace("/file/", "/hash/")
    )
  }

});
