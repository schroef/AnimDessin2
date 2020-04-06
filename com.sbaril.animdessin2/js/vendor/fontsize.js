
window.onload = function() {
    var fontchange = document.createElement("div");
    var fontchangelink = function(fontsize, desc) {
        var a = document.createElement('a');
        a.href="#";
        a.style.margin = "5px";
        a.onclick = function() {
            document.body.style.fontSize = fontsize + 'px';
        };
        a.innerHTML = desc;
        return a;
    };

    fontchange.appendChild(document.createTextNode("Change font size:"));
    fontchange.appendChild(fontchangelink(9, "12"));
    fontchange.appendChild(fontchangelink(11, "16"));
    fontchange.appendChild(fontchangelink(13, "20"));

    document.body.insertBefore(fontchange, document.body.childNodes[0]);
};