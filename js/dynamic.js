/*
 * This script will place content to summary.html dynamically.
 */ 

//General class for general information (paragraph and title)
class General {
    //Name of the class
    constructor (name, head, content) {
        this.name = name;
        createTitle(head);
        createParagraph(content);
    }
    //Create h3 section title 
    createTitle (head) {
        this.title = document.createElement("H3");
        this.title.appendChild(document.createTextNode(head));
    }
    //Content in a paragraph
    createParagraph (content) {
        this.paragraph = document.createElement("P");
        this.paragraph.appendChild(document.createTextNode(content));
    }
}

//Class have specific field: as a list
class ListInfo extends General {
    constructor (name, head, content, itemsList) {
        super(name, head, content);
        //Create an object, if listItems was an array/object
        if (typeof itemsList === "object") {
            this.list = new Object();
            itemsList.forEach(element => {
                this.list.element = element;   
            });
            createList();
        }
    }
    //Create html list with list object
    createList() {
        this.ul = document.createElement("UL");
        this.li = document.createElement("LI");
        
        //Appends all li-items to unordered list
        Object.values(this.list).forEach(element => {
            this.listText = document.createTextNode(element);
            this.li.appendChild(this.listText);
            //Append the list item to the ul, then clear li-tag
            this.ul.appendChild(this.li);
            this.li.removeChild(this.listText);
        });
    }
}

//One other class 