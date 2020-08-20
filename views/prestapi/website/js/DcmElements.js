/*
JS Dynamic Contents Manager.
This script is globally used by asychronous contents and it will be loaded every time content DOM has changed
*/

// Accordion Menu List
var ulMenu = document.getElementsByClassName("accordion-menu");
for (let i = 0; i < ulMenu.length; i++) {
  ulMenu[i].addEventListener('click', toggleChild, false);
}

// <dl><dt></dt><dd></dd></dl>
var dtTags = document.getElementsByTagName("DT");
for (let i = 0; i < dtTags.length; i++) {
  dtTags[i].addEventListener('click', toggleSibling, false);
}

/* other stuff */
/*document.addEventListener("DOMSubtreeModified", () => {
  
}, false);*/
