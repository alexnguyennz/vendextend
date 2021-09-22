// *** Autoselect value on tap/click for common input fields such as quantity and price for items. *** //
function focusInputOnClick() {
    document.addEventListener("click", e => {
        if (e.target.matches(".vd-input")) e.target.select();
    });

}

focusInputOnClick();