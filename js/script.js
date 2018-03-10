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
        titleNode.style.color = "white";
        this.domContextMenu.appendChild(titleNode);

        //Create sub title
        var subTitleNode = document.createElement("strong");
        subTitleNode.innerText = window.currentElementID + "\n";
        subTitleNode.id = "ContextMenuSubTitle";
        this.domContextMenu.appendChild(subTitleNode);

        //Create speceficity combobox
        var speceficitySelectorNode = document.createElement("input");
        speceficitySelectorNode.type = "checkbox";
        speceficitySelectorNode.value = window.idSpecefic;
        //Speceficity combobox functionality
        speceficitySelectorNode.onchange = function (e){
            window.idSpecefic = e.srcElement.checked;
            //If current element has no ID set already create one
            if (window.currentElement.id == ''){
                //Generate hopefully unique ID
                window.currentElementID = generateUniqueID(12);
                window.currentElement.id = window.currentElementID;
                document.getElementById("ContextMenuSubTitle").innerText = window.currentElementID + "\n";
            }
        };
        this.domContextMenu.appendChild(speceficitySelectorNode);

        //Create spececifity label
        var label1 = document.createElement("label");
        label1.innerHTML = "Only this part<br>";
        this.domContextMenu.appendChild(label1);

        //Create color label
        var label2 = document.createElement("label");
        label2.innerText = "Color: ";
        this.domContextMenu.appendChild(label2);

        //Create color input
        var inputColorNode = document.createElement("input");
        inputColorNode.type = "color";
        console.log(window.currentElement.style.color);
        inputColorNode.value = window.currentElement.style.color;
        //Functionality of color input
        inputColorNode.onchange = function (e){
            var col = e.srcElement.value;
            //Specefic or aspecefic style application
            if (window.idSpecefic === true){
                changeCSS(window.currentElementTagName + "#" + window.currentElementID, "color", col);
            }else{
                changeCSS(window.currentElementTagName, "color", col);
            }
        };
        this.domContextMenu.appendChild(inputColorNode);
        
        var label3 = document.createElement("label");
        label3.innerText = "\nFont size: ";
        this.domContextMenu.appendChild(label3);

        //Create font size selector
        var fontSizeSelector = document.createElement("input");
        fontSizeSelector.type = "range";
        fontSizeSelector.min = 1;
        fontSizeSelector.max = 200;
        fontSizeSelector.style.width = "100%";
        //Funcionality of font size selector
        fontSizeSelector.onchange = function (e){
            var size = e.srcElement.value;
            //Specefic or aspecefic style application
            if (window.idSpecefic === true){
                changeCSS(window.currentElementTagName + "#" + window.currentElementID, "font-size", size + "px");
            }else{
                changeCSS(window.currentElementTagName, "font-size", size + "px");
            }
        }
        this.domContextMenu.appendChild(fontSizeSelector);

        //Add context menu to document
        document.body.appendChild(this.domContextMenu);
    }

    show(){
        //Set style for Context Menu
        this.domContextMenu.style.display = "block";
        this.domContextMenu.style.position = "absolute";
        this.domContextMenu.style.backgroundColor = "darkgrey";
        this.domContextMenu.style.width = "200px";
        this.domContextMenu.style.height = "400px";
        this.domContextMenu.style.padding = "10px";
        this.domContextMenu.style.borderRadius = "5px";
        this.domContextMenu.style.borderColor = "darkred"; 
        this.domContextMenu.style.left = this.posX + "px";
        this.domContextMenu.style.top = this.posY + "px";
        this.domContextMenu.style.zIndex = "50";
        console.log(this);
    }
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

document.onclick = function (e){
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
}
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
    
    contextMenu = new ContextMenu(e.srcElement.tagName, e.srcElement.id, e.srcElement, e.pageX, e.pageY); 

    contextMenu.show();
    return false; //Stop normal context menu from opening
}

