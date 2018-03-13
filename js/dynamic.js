/*
 * This script will place content to summary.html dynamically.
 */ 

//General class for general information (paragraph and title)
class General {
    //Name of the class
    constructor (name, head, content) {
        this.name = name;
        this.createTitle(head);
        this.createSection(content);
    }
    //Create h3 section title 
    createTitle (head) {
        this.title = document.createElement("h3");
        this.title.appendChild(document.createTextNode(head));
    }
    //Content in a paragraph (within section), also the section has ID equal to the name
    createSection (content) {
        this.section = document.createElement("section");
        this.section.id = this.name;
        this.paragraph = document.createElement("p");
        this.paragraph.appendChild(document.createTextNode(content));
        this.section.appendChild(this.paragraph);
    }
}

//Class have specific field: as a list (key-value pairs)
class ListText extends General {
    constructor (name, head, content, itemsList) {
        super(name, head, content);
        //Create an object, if listItems was an array/object
        if (typeof itemsList === "object") {
            this.list = itemsList;

            this.createList();
        }
    }
    //Create html list with list object
    createList() {
        this.ul = document.createElement("ul");
        
        for(var key in this.list) {
                this.li = document.createElement("li");
                this.listText = document.createTextNode(key + ' - ' + this.list[key]);
                this.li.appendChild(this.listText);
                //Append the list item to the ul
                this.ul.appendChild(this.li);
        }
    }
}

//E.g. economis page has statistic; an image (could apply to other pages as well)
class ImageText extends General {
    constructor (name , head, content, imagePath, alternative) {
        super (name, head, content);
        //Only accept specific imagePath, accept only .jpg extension
        if (typeof imagePath === "string" && imagePath.endsWith(".jpg") && typeof alternative === "string") 
            this.createImage(imagePath, alternative); 
    }
    createImage(imagePath, alternative) {
        this.img = document.createElement("img");
        this.img.setAttribute("src", imagePath);
        this.img.setAttribute("alt", alternative);
    }
}

//Create the necessary objects 
window.securityList = new Object({
    DoS: `Denial of service attacks (DoS) are designed to make a machine or network resource unavailable 
    to its intended users.`,
    Phishing: "Phishing is the attempt to acquire sensitive information.",
    Injection: `SQL-injection is based on providing 'unusual' input for the input fields, e.g. username and 
    password.`,
    Malware: "The purpose of malware is to steal personal, financial or business information and use it against the victim.",
    Spoofing: "an attack whereby a person or a program pretends to be something else (false identity) and thus gain an illegal advantage."
});

window.importanceList = new Object({
    Secrecy: `Secrecy sometimes also know as confidentiality means 
    that only people with the right permissions should be able to access certain data or computer systems.`,
    Integrity: `Only certain people should have access to write certain data in a computer system even in 
    cases where everyone is allowed to read the data.`,
    Availability: `  Availability in short means that people who have access to a certain computer system 
    should always be able to access that system.` 
});

pageHistory = new General("History", "First form of hacking", `The first security threats were actually created before 
personal computers were a common household item. Decades ago, criminals often looked to tap into phone systems. 
Starting in the 1960s, AT&T decided to closely monitor calls in order to catch “phone freaks.” These “phreakers”, 
as they were called, used “blue boxes” to generate the right tone to get free calls. This surveillance eventually 
led to 200 convictions. Not long after, a man named John Draper found a way to duplicate a tone using a blue box 
and a toy whistle found in Cap’n Crunch cereal. The tone was used to unlock the AT&T network. 
As serious as these threats were, the focus on phone networks would soon pave the way for greater risks to computers.`);

pageEncryption = new General("Encryption", "Encryption", `Encryption ensures that one party can safely communicate a message or piece of 
data from one system to another. We often see this explained as stoping people 
from interfere in this communication. However this is not entirely accurate.
As encryption itself does not stop any third party from seeing the encrypted data.
What encryption does achieve however is that this third party is unable to view the actual data.
And it also protects against any third party sending data pretending to be someone they are not.
In this way though a third party can still interfere with the communications, because these 
are unintelligable for them it is has the same result as if they were unable to interfere.`);

pageImportance = new ListText("Importance", "Importance of security", `Imporance has become increasingly important as more and 
more computer systems are being utilzed. With more and more devices going on the internet, know as the Internet of Things, 
the attack surface for hackers has also increased. Even cars have become a target for hackers as the computers inside 
them are getting increasingly complex, but also increasingly connected with the internet.`,window.importanceList);

pageSecurity = new ListText("Security", "Security attacks", `Computer security, or more formally known as IT security, is defined as the protection 
of computer systems from the theft and damage to their hardware, software or information, 
as well as from disruption or misdirection of the services they provide
Thus, protection includes the physical and software side. Security is a growing field of interest and
importance because we are relying more and more on these devices. These devices are connected to the 
Internet, and that brings a lot of trouble with it.`, window.securityList); 

pageEconomics = new ImageText("Economics", "Statistics about security", `The image hereunder points out the statistics of 
the spending on cyber security in the recent years (in the U.S.) as a percentage of the GDP as 
well as absolute in USD (dollars). We see an increasing spending over the years.`, 
"http://publications.atlanticcouncil.org/cyberrisks//images/figure-8.jpg", "Cybersecurity spendings");

//The object pageEconomics contains an image, we need to add a specific ID for the CSS.
pageEconomics.img.id = "economicsImage";


//Method to add siblings to the parent node
function addSibling (obj) {
    window.article.appendChild(obj.section);
    obj.section.prepend(obj.title); //Title before everything
    if(obj instanceof ListText) 
        obj.section.appendChild(obj.ul);
    else if(obj instanceof ImageText) 
        obj.section.appendChild(obj.img);
}

//Create article
window.article = document.createElement("article");
window.h1 = document.createElement("h1");
window.h1.appendChild(document.createTextNode("Summary"));
window.article.appendChild(window.h1);
window.h1.setAttribute("id", "articleTitle")
$("main")[0].appendChild(article);

//Have a menu to reference each object (list)
function addMenu() {
    var ul = document.createElement("ul");
    for(var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] === "string") 
        {
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.setAttribute("href", "#" + arguments[i]);
            a.appendChild(document.createTextNode(arguments[i]));
            li.appendChild(a);
            ul.appendChild(li);
        }
    }
    //Check if list items were created
    if (ul.innerHTML !== "")
        window.article.appendChild(ul);
}

//Create the menu
addMenu(pageHistory.name, pageEncryption.name, pageImportance.name, pageSecurity.name, pageEconomics.name);

//Append objects to article
addSibling(pageHistory);
addSibling(pageEncryption);
addSibling(pageImportance); 
addSibling(pageSecurity);
addSibling(pageEconomics);