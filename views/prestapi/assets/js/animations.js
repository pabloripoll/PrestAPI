/*
JS Animations.
This script is globally use by Contents and it will be loaded every time Content DOM is called
*/

/* <accordionChild> will expand element first child height depending on its height */
var toggleChild = (e) => {
  if(e.target.nodeName === 'A'){ // Set which tag is list sibling    
    let nodeHeight = e.target.clientHeight;  // li > <tag???> difines height
    let parent = e.target.parentNode.parentNode;
    let target = e.target.nextElementSibling;
    if(target){      
      let statusHeight = target.clientHeight;
      if(statusHeight == 0){ // if target list is hidden
        let targetHeight = nodeHeight * target.children.length; // li height difined by child <tag???>
        target.style.height = targetHeight + 'px';
        if(parent.className && parent.className == 'accordion-menu'){
          // nothing
        } else {
          // Count Parents
          var parentsTree = []; $i = 0;
          for (let p = e.target && e.target.parentElement; p; p = p.parentElement) {
            if(p.nodeName == 'UL'){
              parentsTree.push(p);
            } 
          }
          for (let i = 0; i < parentsTree.length; i++) {
            if(parentsTree[i].className != 'accordion-menu'){
              let parentHeight = parentsTree[i].clientHeight;
              var newParentHeight = parentHeight + targetHeight;
              parentsTree[i].style.height = newParentHeight + 'px'; 
            }
          }
        }
      } else { // if target list is already shown
        // get target list height before close
        let targetHeight = nodeHeight * target.children.length;
        // hide or close target list
        target.style.height = 0;
        // if it's main index right below .accordion-menu, close all children lists
        if(parent.className && parent.className == 'accordion-menu'){          
          var ulChildren = parent.querySelectorAll("ul");
          for (let i = 0; i < ulChildren.length; i++) {
            ulChildren[i].style.height = 0;
          }
        } else {
          // Close target list children
          let child = target.querySelectorAll('ul');
          let childSum = 0;
          for (let i = 0; i < child.length; i++) {
            childSum += child[i].clientHeight;            
            child[i].style.height = 0;
          }
          // parse parents to update its heights
          let parentsTree = []; $i = 0;
          for (let p = e.target && e.target.parentElement; p; p = p.parentElement) {
            if(p.nodeName == 'UL'){
              if(p.className != 'accordion-menu'){
                parentsTree.push(p);
              }
            }
          }
          //
          for (let i = 0; i < parentsTree.length; i++) {
            // close target list
            let parentHeight = parentsTree[i].clientHeight; 
            var newParentHeight = parentHeight - targetHeight;
            parentsTree[i].style.height = newParentHeight + 'px';
            /* Bug */
            /*if(parent.parentNode.parentNode.className){ // level 2 from main
              //parent.style.height = (targetHeight + nodeHeight) + 'px';
            } else {
              parent.style.height = (targetHeight) + 'px';
              console.log(parent);
            }*/

          }
          // end
        }        
      }      
    }
  }  
}

/* <accordionSibling> will expand element sibling height depending on its child height */
var toggleSibling = (e) => { // this will be redeclare
  var target = e.target.nextElementSibling.clientHeight;
  let height = e.target.nextElementSibling.firstElementChild.clientHeight;
  if(target == 0){ height = height; } else { height = 0; }
  e.target.nextElementSibling.style.height = height + 'px'; // set element height
}