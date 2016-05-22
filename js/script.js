//va en angular, en la logica del chip onkeyup="return onkeyup()"

function onkeyup(e) {
    var code;
    if (!e) var e = window.event; // some browsers don't pass e, so get it from the window
    if (e.keyCode) code = e.keyCode; // some browsers use e.keyCode
    else if (e.which) code = e.which;  // others use e.which

    if (code == 8 || code == 46)
        return false;
}