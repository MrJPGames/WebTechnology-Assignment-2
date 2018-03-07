//This object creates the Context menu shown to user when right clinking page
class ContextMenu {
    constructor(tagName, idName,mousePosition){
        this.title = tagName;
        this.posX = mousePosition.x;
        this.posY = mousePosition.y;
    }

    show(){
        this.domContextMenu.style.display = "block";
        this.domContextMenu.style.position = "absolute";
        this.domContextMenu.style.top = this.posX;
        this.domContextMenu.style.bottom = this.posY;
    }
}


var style = document.createElement("style");
document.head.appendChild(style);

//When right click is pressed
document.oncontextmenu = function (e) {
    console.log(e);
    

    contextMenu = ContextMenu(e.srcElement.tagName, e.srcElement.idName, {"x": screenX, "y": screenY} );

    contextMenu.show();
    style.sheet.insertRule(e.srcElement.tagName+'{color:red}');
    return false; //Stop normal context menu from opening
}