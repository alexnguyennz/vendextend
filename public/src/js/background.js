// ********************** // 
// *** INITIALIZATION *** //
// ********************** //

// ************************ // 
// *** CHROME LISTENERS *** //
// ************************ //


// *** Clear all browsing cache on Chrome startup. *** //
chrome.runtime.onStartup.addListener(() => {
    chrome.browsingData.removeCache({});
});


// *** Open options page when extension's browserAction/icon is clicked. *** //
chrome.browserAction.onClicked.addListener( () => chrome.tabs.create({url: "./options.html"}) );


// *** Run MutationObserver when pages are dynamically navigated. *** //
chrome.webRequest.onSendHeaders.addListener(details => {

    if (details.url == "https://site.vendhq.com/api/2.0/nav" && details.requestHeaders[6]["value"] == "https://site.vendhq.com/webregister/") {
        setMutationObserver();
    }

}, {urls: ["https://*.vendhq.com/*"], types: ["xmlhttprequest"]}, ["extraHeaders", "requestHeaders"]);


// *** Run MutationObserver when a page is reloaded. *** //
chrome.webRequest.onCompleted.addListener(details => {

    if (details.url == "https://site.vendhq.com/api/2.0/retailer") {

        chrome.tabs.query({active: true, currentWindow: true, windowType: "normal"}, tab => {
            if (tab[0].url == "https://site.vendhq.com/webregister/") {
                setMutationObserver();
            }
        });
    }

    // rerun observer for retrieving sale due to Vend bug; timeout is needed because Vend error happens after webrequest is finished
    if (details.url.includes("https://site.vendhq.com/api/2.0/sales/")) {
        setTimeout(() => setMutationObserver(), 1000);
    }
}, {urls: ["https://*.vendhq.com/*"], types: ["xmlhttprequest"]});


function setMutationObserver() {
    chrome.tabs.executeScript( {file: 'src/js/contentScripts/sellScreen.js'}, () => {
        if (chrome.runtime.lastError) console.log("Can't run script outside of Vend.");
    });
}