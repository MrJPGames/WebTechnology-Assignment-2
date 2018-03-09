//This object creates the Context menu shown to user when right clicking page
class ContextMenu {
    constructor(tagName, idName, elem, mX, mY){
        window.currentElementTagName = tagName;
        window.currentElementID = idName;
        this.title = window.currentElementTagName;
        this.elem = elem;
        window.currentElement = elem;
        this.posX = mX;
        this.posY = mY;
        this.createContextMenuDom();
    }

    createContextMenuDom(){
        //Create label element to use for all labels

        //Create main context menu element
        this.domContextMenu = document.createElement("div");
        this.domContextMenu.id = "ContextMenu";
        //Create title
        var titleNode = document.createElement("h1");
        titleNode.innerText = this.title;
        titleNode.style.color = "white";
        this.domContextMenu.appendChild(titleNode);

        var subTitleNode = document.createElement("strong");
        subTitleNode.innerHTML = window.currentElementID + "<br>";
        this.domContextMenu.appendChild(subTitleNode);

        var speceficitySelectorNode = document.createElement("input");
        speceficitySelectorNode.type = "checkbox";
        speceficitySelectorNode.value = window.idSpecefic;
        speceficitySelectorNode.onchange = function (e){
            window.idSpecefic = e.srcElement.checked;
            console.log(window.currentElement.id);
            if (window.currentElement.id == ''){
                console.log("Gen ID");
                //Generate hopefully unique ID
                window.currentElementID = Math.random().toString(36).substr(12);
                window.currentElement.id = window.currentElementID;
            }
        };
        this.domContextMenu.appendChild(speceficitySelectorNode);

        var label1 = document.createElement("label");
        label1.innerHTML = "Only this part<br>";
        this.domContextMenu.appendChild(label1);

        var label2 = document.createElement("label");
        label2.innerText = "Color: ";
        this.domContextMenu.appendChild(label2);

        var inputColorNode = document.createElement("input");
        inputColorNode.type = "color";
        inputColorNode.onchange = function (e){
            var col = e.srcElement.value;
            if (window.idSpecefic === true){
                console.log(window.currentElementTagName + "#" + window.currentElementID + "{color: " + col + "}");
                style.sheet.insertRule(window.currentElementTagName + "#" + window.currentElementID + "{color: " + col + "}");
            }else{
                style.sheet.insertRule(window.currentElementTagName + "{color: " + col + "}");
            }
        };
        this.domContextMenu.appendChild(inputColorNode);
        
        var label3 = document.createElement("label");
        label3.innerText = "Font size: ";
        this.domContextMenu.appendChild(label3);

        var fontSizeSelector = document.createElement("input");
        fontSizeSelector.type = "range";
        fontSizeSelector.min = 1;
        fontSizeSelector.max = 200;
        fontSizeSelector.onchange = function (e){
            console.log(e);
            var size = e.srcElement.value;
            if (window.idSpecefic === true){
                console.log(window.currentElementTagName + "#" + window.currentElementID + "{font-szie: " + size + "em}");
                console.log(style.sheet.cssRules);
                style.sheet.insertRule(window.currentElementTagName + "#" + window.currentElementID + "{font-szie: " + size + "em}", );
            }else{
                style.sheet.insertRule(window.currentElementTagName + "{font-size: " + size + "px;}");
            }
        }
        this.domContextMenu.appendChild(fontSizeSelector);

        //Add context menu to document
        document.body.appendChild(this.domContextMenu);
    }

    show(){
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


var style = document.createElement("style");
document.head.appendChild(style);


document.onclick = function (e){
    console.log("test");
    var cMenu = document.getElementById("ContextMenu");
    if (cMenu !== null){
        var inMenu = false;
        e.path.forEach(function (elem){
            if (elem.id == "ContextMenu"){
                inMenu = true;
            }
        });
        if (!inMenu)
            cMenu.remove();
    }
}
//When right click is pressed
document.oncontextmenu = function (e) {
    console.log(e);
    var cMenu = document.getElementById("ContextMenu");
    if (cMenu != null){
        console.log("not NULL");
        console.log(cMenu);
        cMenu.remove();
    }
    
    contextMenu = new ContextMenu(e.srcElement.tagName, e.srcElement.id, e.srcElement, e.pageX, e.pageY); 

    contextMenu.show();
    return false; //Stop normal context menu from opening
}

