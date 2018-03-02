//Wait for DOM to load
$(document).ready(function() {
    var style = document.createElement("style");
    document.head.appendChild(style);
    
    //When context menu is loaded
    document.oncontextmenu = function (e) {
        console.log(e);
        
        style.sheet.insertRule(e.srcElement.tagName+'{color:red}');
    }
});