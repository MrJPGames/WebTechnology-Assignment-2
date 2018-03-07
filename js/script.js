//This object creates the Context menu shown to user when right clicking page
class ContextMenu {
    constructor(tagName, idName, mX, mY){
        this.title = tagName;
        this.posX = mX;
        this.posY = mY;
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

        var inputColorNode = document.createElement("input");
        

        //Add context menu to document
        document.body.appendChild(this.domContextMenu);
    }

    show(){
        this.domContextMenu.style.display = "block";
        this.domContextMenu.style.position = "absolute";
        this.domContextMenu.style.backgroundColor = "darkgrey";
        this.domContextMenu.style.width = "200px";
        this.domContextMenu.style.height = "400px";
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
    var cMenu = document.getElementById("ContextMenu");
    if (cMenu !== null){
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
    
    contextMenu = new ContextMenu(e.srcElement.tagName, e.srcElement.idName, e.pageX, e.pageY); 

    contextMenu.show();
    return false; //Stop normal context menu from opening
}

