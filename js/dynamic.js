/*
 * This script will place content to summary.html dynamically.
 */ 

//General class
class General {
    //Name of the class
    constructor (name) {
        this.name = name;
    }
    //Create h3 section title 
    createTitle (head) {
        this.title = document.createElement("H3");
        this.title.appendChild(document.createTextNode(this.head));
    }
    //Content in a paragraph
    createParagraph (content) {
        this.paragraph = document.createElement("P");
        this.paragraph.appendChild(document.createTextNode(this.content));
    }
}