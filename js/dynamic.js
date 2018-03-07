/*
 * This script will place content to summary.html dynamically.
 */ 

//Class of security attacks
class Attack {
    constructor(name) {
        this.name = name;
    }
    // create HTML section of the content
    content(title, description) {
        var section = document.createElement("section");
        section.setAttribute("id", this.name);
        var sectionTitle = document.createElement("h3");
        sectionTitle.appendChild(document.createTextNode(this.title));
        section.appendChild(sectionTitle);
        var paragraph = document.createElement("p");
        paragraph.appendChild(document.createTextNode(this.description));
        section.appendChild(paragraph);
    }
}