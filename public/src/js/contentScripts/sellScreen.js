// *** Focus on last item's price in list. ***/
function clickLastItem() {
    try {
        const itemNodes = document.getElementsByClassName('li-cell-summary--totals-container');
        const lastItem = itemNodes[itemNodes.length - 1]; // click last item

        if (lastItem != undefined) lastItem.click();
    } catch {
        console.log("ERROR: Could not click last item - sale is empty or page is not on sell screen.");
    }
}

if (typeof observer === 'undefined') {
    let observer;
}


// *** Look for DOM changes in the sale. *** //
function setMutationObserver() {

    // Select sale list
    const targetNode = document.getElementsByClassName("sale-list");

    // Set MutationObserver options - which mutations to observe
    const config = { childList: true, attributes: false, subtree: false, characterData: false };

    const callback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length && mutation.addedNodes[0]["localName"] == "li") {
                console.log('Sale item added.');

                clickLastItem();
            }
        }
    };

    try {
        observer.disconnect(); // Remove any existing MutationObservers, otherwise functionality will be duplicated
        console.log("Disconnecting existing MutationObserver(s).");
    } catch {
        console.log("Can't disconnect existing MutationObserver(s) - none running.");
    }

    observer = new MutationObserver(callback); // Create an observer instance linked to the callback function

    try {
        observer.observe(targetNode[0], config);
        console.log("MutationObserver running.");
    } catch {
        console.log("ERROR: MutationObserver could not observe. Not on webregister sales page.");
    }
}

setMutationObserver();