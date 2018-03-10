/*
 * This script will place content to summary.html dynamically.
 */ 

//General class for general information (paragraph and title)
class General {
    //Name of the class
    constructor (name) {
        this.name = name;
    }
    //Create h3 section title 
    createTitle (head) {
        this.title = document.createElement("H3");
        this.title.appendChild(document.createTextNode(head));
    }
    //Content in a paragraph (with section)
    createParagraph (content) {
        this.section = document.createElement("SECTION");
        this.paragraph = document.createElement("P");
        this.paragraph.appendChild(document.createTextNode(content));
        this.section.appendChild(this.paragraph);
    }
}

try {
history = new General("History");
console.log(history.name);
history.createTitle("First form of hacking");
}
catch (E) {
    console.log(E);
}

/*
//Class have specific field: as a list (key-value pairs)
class ListText extends General {
    constructor (name, head, content, itemsList) {
        super(name, head, content);
        //Create an object, if listItems was an array/object
        if (typeof itemsList === "object") {
            this.list = new Object();
            for (var key in this.itemsList) 
                this.list.key = this.itemsList.key;  
            this.createList();
        }
    }
    //Create html list with list object
    createList() {
        this.ul = document.createElement("UL");
        this.li = document.createElement("LI");
        
        for (var key in this.list) {
            this.listText = document.createTextNode(key + ' - ' + this.list.key);
            this.li.appendChild(this.listText);
            //Append the list item to the ul, then clear li-tag
            this.ul.appendChild(this.li);
            this.li.removeChild(this.listText);
        }
    }
}

//Economis page has statistic; an image
class ImageText extends General {
    constructor (name , head, content, imagePath, alternative) {
        super (name, head, content);
        //Only accept specific imagePath
        if (typeof imagePath === "string" && imagePath.endsWith(".jpg") && typeof alternative === "string") 
            this.createImage(imagePath); 
    }
    createImage(imagePath) {
        this.img = document.createElement("IMG");
        this.img.setAttribute("src", imagePath);
        this.img.setAttribute("alt", alternative);
    }
}

*/

/*
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

history = new General("History", "First form of hacking", `The first security threats were actually created before 
personal computers were a common household item. Decades ago, criminals often looked to tap into phone systems. 
Starting in the 1960s, AT&T decided to closely monitor calls in order to catch “phone freaks.” These “phreakers”, 
as they were called, used “blue boxes” to generate the right tone to get free calls. This surveillance eventually 
led to 200 convictions. Not long after, a man named John Draper found a way to duplicate a tone using a blue box 
and a toy whistle found in Cap’n Crunch cereal. The tone was used to unlock the AT&T network. 
As serious as these threats were, the focus on phone networks would soon pave the way for greater risks to computers.`);

encryption = new General("Encryption", "Encryption", `Encryption ensures that one party can safely communicate a message or piece of 
data from one system to another. We often see this explained as stoping people 
from interfere in this communication. However this is not entirely accurate.
As encryption itself does not stop any third party from seeing the encrypted data.
What encryption does achieve however is that this third party is unable to view the actual data.
And it also protects against any third party sending data pretending to be someone they are not.
In this way though a third party can still interfere with the communications, because these 
are unintelligable for them it is has the same result as if they were unable to interfere.`);

importance = new ListText("Importance", "Importance of security", `Imporance has become increasingly important as more and 
more computer systems are being utilzed. With more and more devices going on the internet, know as the Internet of Things, 
the attack surface for hackers has also increased. Even cars have become a target for hackers as the computers inside 
them are getting increasingly complex, but also increasingly connected with the internet.`,window.securityList);

security = new ListText("Security", "Security Attacks", `Computer security, or more formally known as IT security, is defined as the protection 
of computer systems from the theft and damage to their hardware, software or information, 
as well as from disruption or misdirection of the services they provide
Thus, protection includes the physical and software side. Security is a growing field of interest and
importance because we are relying more and more on these devices. These devices are connected to the 
Internet, and that brings a lot of trouble with it. 
In the next section we will discuss some common modern attacks.`, window.securityList);

economics = new ImageText("Economics", "Statistics about security", `The image hereunder points out the statistics of 
the spending on cyber security in the recent years (in the U.S.) as a percentage of the GDP as 
well as absolute in USD (dollars). We see an increasing spending over the years.`, "http://publications.atlanticcouncil.org/cyberrisks//images/figure-8.jpg");
*/

/*Method to add siblings to the parent node
function addSibling (parent, obj) {
    if (obj instanceof General) {
        parent.appendChild(obj.title);
        parent.appendChild(obj.section);
    }
    console.log(obj.name);
}

//Put every object on the page: summary.html
addSibling($("main")[0], history);
*/