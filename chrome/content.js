// Change title when pdf is loaded

const exName = "[EasyOA]";
const parser = new DOMParser();
const mlrPressRegex = /\/[^\/]+$/;

let paperTitle = null;
let pageComplete = false;


// Insert the title into the active tab.
// After the insertion, the title might be overwritten after the PDF has been loaded.
function insertTitle(newTitle) {
  if (newTitle === null) return;

  console.log(exName, "Trying to change title to: " + newTitle)
  var elTitles = document.getElementsByTagName("title");
  if (elTitles.length !== 0) {
    // Modify directly if <title> exists.
    var elTitle = elTitles[0];
    elTitle.innerText = newTitle;
    console.log(exName, "Modify <title> tag directly.");
    return;
  }
  var elHeads = document.getElementsByTagName("head");
  if (elHeads.length !== 0) {
    // Modify <head> if <title> doesn't exist.
    var elHead = elHeads[0];
    var elTitle = document.createElement("title");
    elTitle.innerText = newTitle;
    elHead.appendChild(elTitle);
    console.log(exName, "Modify <head> tag.");
    return;
  }
  var elHtmls = document.getElementsByTagName("html");
  if (elHtmls.length !== 0) {
    // Modify <html> if both <title> and <head> doesn't exist.
    var elHtml = elHtmls[0];
    var elHead = document.createElement("head");
    var elTitle = document.createElement("title");
    elTitle.innerText = newTitle;
    elHead.appendChild(elTitle);
    if (elHtml.firstChild !== null) {
      elHtml.insertBefore(elHead, elHtml.firstChild);
      console.log(exName, "Modify <html> tag by inserting before first child.");
    } else {
      elHtml.appendChild(elHead);
      console.log(exName, "Modify <html> tag by appending.");
    }
    return;
  }
  console.log(exName, "Error: Cannot insert title");
}


function getTitle() {
  let url = window.location.href;
  // 获取论文标题
  if (!url.endsWith(".pdf")) {
    if (url.includes("openreview.net/pdf?id=")) {
      fetch(url.replace("net/pdf?", "net/forum?"))
        .then((response) => response.text())
        .then((text) => {
          let doc = parser.parseFromString(text, "text/html");
          let metaTag = doc.querySelector("meta[property='og:title']");
          paperTitle = metaTag.getAttribute("content");
          console.log(exName, "get title:", paperTitle);
          chrome.runtime.sendMessage({message: "titleLoaded", title: paperTitle});
        })
        .catch((error) => console.log(error));
    }

    return;
  }

  if (url.includes("arxiv.org/pdf/")) {
    fetch(url.replace(".pdf", "").replace("arxiv.org/pdf/", "export.arxiv.org/api/query?id_list="))
      .then((response) => response.text())
      .then((text) => {
        let doc = parser.parseFromString(text, "text/xml");
        let title = doc.getElementsByTagName("title")[1].innerHTML;
        paperTitle = title.replace("\n", "").replace("  ", " ");
        console.log(exName, "get title:", paperTitle);
        chrome.runtime.sendMessage({message: "titleLoaded", title: paperTitle});
      })
      .catch((error) => console.log(error));

  } else if (url.includes("proceedings.mlr.press")) {
    fetch(url.replace(mlrPressRegex, ""))
      .then((response) => response.text())
      .then((text) => {
        let doc = parser.parseFromString(text, "text/html");
        let metaTag = doc.querySelector("meta[name='twitter:title']");
        paperTitle = metaTag.getAttribute("content");
        console.log(exName, "get title:", paperTitle);
        chrome.runtime.sendMessage({message: "titleLoaded", title: paperTitle});
        })
      .catch((error) => console.log(error));

  } else if (url.includes("papers.nips.cc/paper_files")) {
    fetch(url
      .replace(".pdf", ".html")
      .replace("-Paper", "-Abstract")
      .replace("/file/", "/hash/")
    ).then((response) => response.text())
      .then((text) => {
        let doc = parser.parseFromString(text, "text/html");
        paperTitle =  doc.getElementsByTagName("title")[0].innerHTML;
        console.log(exName, "get title:", paperTitle);
        chrome.runtime.sendMessage({message: "titleLoaded", title: paperTitle});
      })
      .catch((error) => console.log(error));

  } else if (url.includes("aclanthology.org/")) {
    fetch(url.replace(".pdf", "")).then((response) => response.text())
      .then((text) => {
        let doc = parser.parseFromString(text, "text/html");
        paperTitle =  doc.getElementById("title").getElementsByTagName('a')[0].innerHTML;
        console.log(exName, "get title:", paperTitle);
        chrome.runtime.sendMessage({message: "titleLoaded", title: paperTitle});
      })
      .catch((error) => console.log(error));
  }
}

// Get the title when the PDF is loading.
getTitle();


function changeTitle(request, sender, sendResponse) {
  if (request.message === 'complete') {
    pageComplete = true;
  } else if (request.message === 'changeTitle' && paperTitle !== null && pageComplete) {
    // if (document.title !== paperTitle) {
      console.log(exName, 'set title');
      insertTitle(paperTitle);
    // }
  }
}

// Listen for background script's message, since the title might be changed when PDF is loaded.
chrome.runtime.onMessage.addListener(changeTitle);
