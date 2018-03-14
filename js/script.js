window.clipboard = null;

//This object creates the Context menu shown to user when right clicking page
class ContextMenu {
    constructor(tagName, idName, elem, mX, mY){
        //Set global variables (needed for accessing in event callbacks)
        window.currentElementTagName = tagName;
        window.currentElementID = idName;
        window.currentElement = elem;

        //Set object variables
        this.title = window.currentElementTagName;
        this.elem = elem;
        this.posX = mX;
        this.posY = mY;

        this.pageHeight = $(document).height();
        this.pageWidth = $(document).width();

        //Create context menu
        this.createContextMenuDom();
    }

    createContextMenuDom(){
        //Create main context menu element
        this.domContextMenu = document.createElement("div");
        this.domContextMenu.id = "ContextMenu";

        //Create title
        var titleNode = document.createElement("h1");
        titleNode.innerText = this.title;
        this.domContextMenu.appendChild(titleNode);

        //Create sub title
        var subTitleNode = document.createElement("strong");
        subTitleNode.innerText = window.currentElementID + "\n";
        subTitleNode.id = "ContextMenuSubTitle";
        this.domContextMenu.appendChild(subTitleNode);

        //Create speceficity combobox
        var speceficitySelectorNode = document.createElement("input");
        speceficitySelectorNode.type = "checkbox";
        speceficitySelectorNode.id = "speceficitySelectorInput";
        speceficitySelectorNode.value = window.idSpecefic;
        //Speceficity combobox functionality
        speceficitySelectorNode.addEventListener("change", e => {
            window.idSpecefic = e.srcElement.checked;
            //If current element has no ID set already create one
            if (window.currentElement.id == ''){
                //Generate hopefully unique ID
                window.currentElementID = generateUniqueID(12);
                window.currentElement.id = window.currentElementID;
                document.getElementById("ContextMenuSubTitle").innerText = window.currentElementID + "\n";
            }
        });
        this.domContextMenu.appendChild(speceficitySelectorNode);

        //Create spececifity label
        var label1 = document.createElement("label");
        label1.innerHTML = "Only this part<br>";
        label1.setAttribute("for", "speceficitySelectorInput"); //Make label clickable
        this.domContextMenu.appendChild(label1);

        //Create color label
        var label2 = document.createElement("label");
        label2.innerText = "Color: ";
        this.domContextMenu.appendChild(label2);

        //Create color input
        var inputColorNode = document.createElement("input");
        inputColorNode.type = "color";
        //Set value to current color of element
        inputColorNode.value = rgb2hex(window.getComputedStyle(window.currentElement).color);
        //Functionality of color input
        inputColorNode.addEventListener("change", e => {
            var col = e.srcElement.value;
            //Specefic or aspecefic style application
            if (window.idSpecefic === true){
                changeCSS(window.currentElementTagName + "#" + window.currentElementID, "color", col);
            }else{
                changeCSS(window.currentElementTagName, "color", col);
            }
        });
        this.domContextMenu.appendChild(inputColorNode);
        this.domContextMenu.appendChild(document.createElement("br"));
        
        var label3 = document.createElement("label");
        label3.innerText = "Font size:\n";
        this.domContextMenu.appendChild(label3);

        //Create font size selector
        var fontSizeSelector = document.createElement("input");
        fontSizeSelector.type = "range";
        fontSizeSelector.min = 1;
        fontSizeSelector.max = 200;
        //Set value to current font-size of element
        fontSizeSelector.value = window.getComputedStyle(window.currentElement).fontSize.slice(0,-2);
        //Funcionality of font size selector
        fontSizeSelector.addEventListener("change", e => {
            var size = e.srcElement.value;
            //Specefic or aspecefic style application
            if (window.idSpecefic === true){
                changeCSS(window.currentElementTagName + "#" + window.currentElementID, "font-size", size + "px");
            }else{
                changeCSS(window.currentElementTagName, "font-size", size + "px");
            }
        });
        this.domContextMenu.appendChild(fontSizeSelector);
        this.domContextMenu.appendChild(document.createElement("br"));

        var fontWeightCombobox = document.createElement("input");
        fontWeightCombobox.type = "checkbox";
        fontWeightCombobox.id = "fontWeightInput";
        fontWeightCombobox.addEventListener("change", e => {
            var bold = e.srcElement.checked;
            var weight = 400; //Not bold
            if (bold){
                weight = 900; //Bold
            }
            if (window.idSpecefic === true){
                changeCSS(window.currentElementTagName + "#" + window.currentElementID, "font-weight", weight);
            }else{
                changeCSS(window.currentElementTagName, "font-weight", weight);
            }
        });
        this.domContextMenu.appendChild(fontWeightCombobox);

        var label3 = document.createElement("label");
        label3.innerText = "Bold\n";
        label3.setAttribute("for", "fontWeightInput");
        this.domContextMenu.appendChild(label3);

        var fontItalicCombobox = document.createElement("input");
        fontItalicCombobox.type = "checkbox";
        fontItalicCombobox.id = "fontItalicInput";
        fontItalicCombobox.addEventListener("change", e =>{
            var italic = e.srcElement.checked;
            var style = "normal"; //Not italic
            if (italic){
                style = "italic";
            }
            if (window.idSpecefic === true){
                changeCSS(window.currentElementTagName + "#" + window.currentElementID, "font-style", style);
            }else{
                changeCSS(window.currentElementTagName, "font-style", style);
            }
        });
        this.domContextMenu.appendChild(fontItalicCombobox);

        var label3 = document.createElement("label");
        label3.innerText = "Italic\n";
        label3.setAttribute("for", "fontItalicInput");
        this.domContextMenu.appendChild(label3);

        var copyButton = document.createElement("div");
        copyButton.innerText = "Copy";
        copyButton.className = "contextMenuButton";
        copyButton.addEventListener("click", e => {
            window.clipboard = window.currentElement.innerText;
        });
        this.domContextMenu.appendChild(copyButton);

        //Cut button
        var cutButton = document.createElement("div");
        cutButton.innerText = "Cut";
        cutButton.className = "contextMenuButton";
        cutButton.addEventListener("click", e => {
            window.clipboard = window.currentElement.innerText;
            window.currentElement.innerText="";
        });
        this.domContextMenu.appendChild(cutButton);

        var pasteButton = document.createElement("div");
        pasteButton.innerText = "Paste";
        pasteButton.className = "contextMenuButton";
        pasteButton.id = "";
        pasteButton.addEventListener("click", e => {
            if (window.clipboard != null){
                window.currentElement.innerText = window.clipboard;
            }
        });
        this.domContextMenu.appendChild(pasteButton);

        var editButton = document.createElement("div");
        editButton.innerText = "Edit";
        editButton.className = "contextMenuButton";
        editButton.addEventListener("click", e => {
            //Create editing toolset:
            var text = window.currentElement.innerHTML;
            var textarea = document.createElement("textarea");
            textarea.innerText = text;
            textarea.style.width = "100%";
            textarea.id = generateUniqueID(12);
            var elem = window.currentElement;
            elem.parentNode.insertBefore(textarea, elem.nextSibling);

            var okButton = document.createElement("button");
            okButton.innerText = "Set changes";
            okButton.id = "okButton";
            okButton.setAttribute("textFieldID", textarea.id);
            okButton.addEventListener("click", e => {
                //Set HTML to HTML from textarea
                window.currentElement.innerHTML = document.getElementById(e.srcElement.getAttribute("textFieldID")).value;

                //Remove editing toolset
                document.getElementById(e.srcElement.getAttribute("textFieldID")).remove();
                document.getElementById("cancelButton").remove();
                e.srcElement.remove();
            });
            textarea.parentNode.insertBefore(okButton, textarea.nextSibling);

            var cancelButton = document.createElement("button");
            cancelButton.innerText = "Cancel";
            cancelButton.id = "cancelButton";
            cancelButton.setAttribute("textFieldID", textarea.id);
            cancelButton.addEventListener("click", e => {
                //Remove editing toolset (without first setting innerHTML)
                document.getElementById(e.srcElement.getAttribute("textFieldID")).remove();
                document.getElementById("okButton").remove();
                e.srcElement.remove();
            });
            okButton.parentNode.insertBefore(cancelButton, okButton.nextSibling);

            //Close context menu
            var cMenu = document.getElementById("ContextMenu");
            cMenu.remove();
        });
        this.domContextMenu.appendChild(editButton);

        //Set  position
        this.domContextMenu.style.left = this.posX + "px";
        this.domContextMenu.style.top = this.posY + "px";

        //Add context menu to document
        document.body.appendChild(this.domContextMenu);

        //When all is set and done let's check if the context menu would go outside the page
        if (this.posY + Math.round(window.getComputedStyle(this.domContextMenu).height.slice(0,-2)) > this.pageHeight){
            this.posY = this.pageHeight - (Math.round(window.getComputedStyle(this.domContextMenu).height.slice(0,-2)) + 40);
        }

        if (this.posX + Math.round(window.getComputedStyle(this.domContextMenu).width.slice(0,-2)) > this.pageWidth){
            this.posX = this.pageWidth - (Math.round(window.getComputedStyle(this.domContextMenu).width.slice(0,-2)) + 20);
        }
        
        //Set  position again in case the original placed it outside the page
        this.domContextMenu.style.left = this.posX + "px";
        this.domContextMenu.style.top = this.posY + "px";
    }
}

//Declare hex digits
var hexDigits = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]; 

//Function to convert rgb color to hex format
function rgb2hex(rgb) {
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
 }

//Modified from: https://stackoverflow.com/questions/1212500/create-a-css-rule-class-with-jquery-at-runtime
function changeCSS(selector, property, value){
    var s = style.sheet;
    var rules = s.cssRules || s.rules;
    for(var i = rules.length - 1, found = false; i >= 0 && !found; i--){
        var r = rules[i];
        if(r.selectorText == selector){
            r.style.setProperty(property, value);
            found = true;
        }
    }
    if(!found){
        s.insertRule(selector + '{' + property + ':' + value + ';}', rules.length);
    }
}

function generateUniqueID(IDlen = 8){
    var charBank = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var randomString = '';
    for (var i = 0; i < IDlen ; i++) {
        randomString += charBank[Math.round(Math.random() * charBank.length)];
    }
    return randomString;
}


var style = document.createElement("style");
document.head.appendChild(style);

document.addEventListener("click", e => {
    var cMenu = document.getElementById("ContextMenu");
    //Does a context menu exist
    if (cMenu !== null){
        var inMenu = false;
        //Check if element higher up is the Context Menu
        e.path.forEach(function (elem){
            if (elem.id == "ContextMenu"){
                inMenu = true;
            }
        });
        //If click was not on context menu (aka outside context menu) close context menu
        if (!inMenu)
            cMenu.remove();
    }
}, false);

//When right click is pressed
document.oncontextmenu = function (e) {
    var cMenu = document.getElementById("ContextMenu");
    //Does a context menu exist
    if (cMenu !== null){
        var inMenu = false;
        //Check if element higher up is the Context Menu
        e.path.forEach(function (elem){
            if (elem.id == "ContextMenu"){
                inMenu = true;
            }
        });
        //If click was not on context menu (aka outside context menu) close context menu
        if (!inMenu)
            cMenu.remove();
        else
            return true;
    }
    
    new ContextMenu(e.srcElement.tagName, e.srcElement.id, e.srcElement, e.pageX, e.pageY); 
    return false; //Stop normal context menu from opening
}

