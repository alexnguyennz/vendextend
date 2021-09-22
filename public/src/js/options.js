// *************** // 
// *** IMPORTS *** //
// *************** //
// getElementById shorthand
import { $ } from "./global.js";


document.addEventListener("DOMContentLoaded", () => {
    $("save-options").addEventListener("click", saveOptions);
    $("reset-options").addEventListener("click", resetOptions);
});


// *** Save options based on input states in storage. ***/
function saveOptions() {
    const optionInputs = document.getElementsByName("hideElements");

    optionInputs.forEach(input => {
        if (input.checked) {
            chrome.storage.sync.set({[input.id] : input.value});
        } else {
            chrome.storage.sync.remove([input.id]);
        }
    });

    chrome.storage.sync.get(null, items => console.log(items)); // testing
}


// *** Clear storage. ***/
function resetOptions() {
    chrome.storage.sync.clear();
}


// *** Grab saved settings. *** //
async function fetchJSON() {

    let response = await fetch("../../data/settings.json");
    const settings = await response.json();

    return settings;
}


// *** Load settings. *** //
function loadSettings(settings) {

    const div = $("options");

    for (let setting in settings.css) {
        const node = document.createElement("div");

        div.appendChild(node);

        node.innerHTML = '<input type="checkbox" name="hideElements" id="' + setting + '" value="' + settings.css[setting][0] + '"><label for="' + setting + '">' + settings.css[setting][1] + '</label>';
    }

    updateOptionStates();
}


fetchJSON().then(settings => loadSettings(settings));


// *** Update the inputs based on storage settings. *** //
function updateOptionStates() {

    const inputs = document.getElementsByTagName("input");

    chrome.storage.sync.get(null, items => {

        const keys = Object.keys(items);
        
        for (const key of keys) {
            inputs[key].checked = true;
        }
    });
}