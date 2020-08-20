/*
JS Dynamic Content Manager.
This script is the Application Core and will be loaded once when application is executed
*/

/* "CONFIG" if it's first time configuration must be set */
const APP_DIR = ''; // Leave application directory path empty if APP runs on domain root access
const APP_LOC = 0; // => this is an integer count of directories where this index.js App script runs from root
let APP_URL = APP_DIR ; if(APP_URL == '') APP_URL = '/' + APP_DIR;
const APP_SRC = '/website'; // Application page contents source

// URL constants accronyms 
const PCI = window.location.protocol;
const HOST = window.location.host;

/* block
  >>> DCM - index.html DOM <<<
*/
// Update header logo href
document.querySelector('.logo').href = APP_URL;

/* block
  >>> DCM - Utilities <<<
*/
// DCM - RELOAD SCRIPTS
const JS_DcmScripts = (scripts) => {
  scripts.forEach(script => {
    if(script.action == 'reload'){
      // get script element
      let element = document.getElementById(script.id);
      let elementSrc = element.src;
      // remove script element
      element.parentNode.removeChild(element);
      // re insert script element
      let js_script = document.createElement('script');
      js_script.onload = () => {
        // do stuff with the script switching scriptID cases
      };
      js_script.type = "text/javascript";
      js_script.id = script.id;
      js_script.src = elementSrc + '?' + hashMix(7);
      let DcmAppControl = document.getElementById('DcmAppControl');
      if(DcmAppControl.nextSibling){
        DcmAppControl.parentNode.insertBefore(js_script,DcmAppControl.nextSibling);
      } else {
        document.body.appendChild(js_script);
      }
    } else {
      // insert script element
      let js_script = document.createElement('script');
      js_script.onload = () => {
        // do stuff with the script switching scriptID cases
      };
      js_script.type = "text/javascript";
      js_script.className ="DcmPageScript";
      js_script.src = script.src; // + '?' + hashMix(7);
      document.body.appendChild(js_script);
    }
  });
}
const DcmScripts = (array = null) => {
  let scripts = [];
  if(array == null){ // insert Dcm default js scripts
    scripts = [
      {action: 'reload', id:'DcmElements'}
    ];
  } else { // insert another js scripts
    scripts = array;
  }
  JS_DcmScripts(scripts);  
}
// DCM - NEW PAGE SIMULATION
let DCMtimeOut;
const DcmScrollToTop = () => {
  if (document.body.scrollTop!=0 || document.documentElement.scrollTop!=0){
    window.scrollBy(0,-50); // animation speed
    DCMtimeOut = setTimeout('DcmScrollToTop()',10);
  }
  else clearTimeout(DCMtimeOut);
}
// DCM - URI PARAMETERS
const DcmUriParams = (uri) => {
  let paramstr = uri.split('?')[1]; // get url query after '?' in the href
  let paramsarr = paramstr.split('&'); // get all key-value items
  let params = Array();
  for (let i = 0; i < paramsarr.length; i++) {
    var tmparr = paramsarr[i].split('='); // split key from value
    params[tmparr[0]] = tmparr[1]; // sort them in a arr[key] = value way
  }
  return params; // return params as array
}

/* block
  >>> Dcm CONTENT <<<
*/
// DCM - GET PAGE CONTENT from APP_SRC app.js
const getPageContent = (page) => {
  content = page.content || 'error'; // "content" defines page to load
  scripts = page.scripts || null; // array with js scripts objects to onload
  // Avoid client to use any other action meanwhile content is loading
  loadingCover({state:true, theme:'light'});
  // Ajax get page content
  var url = APP_DIR + APP_SRC + `/pages/${content}/${content}.xml`; // but content must be set as index.html default file
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('GET', url, true);  
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // insert content
      document.getElementById("page-content").innerHTML = this.responseText;
      // window load simulation
      DcmScrollToTop();
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      // manage error actions
      console.log('Page content "'+ content +'" cannot be found');
    }
  };
  xhr.onload = function() {
    // Global JS actions scripts to reload
    DcmScripts(null);
    // Remove page content scripts already loaded before
    removeElement(document.querySelectorAll(".DcmPageScript"));
    // New page content scripts to load
    if(scripts != null){      
      DcmScripts(scripts); // page content js scripts
    }
    // Close loading cover
    loadingCover({state:false});
  };
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send();  
  return xhr;
}

/* block
  >>> DCM - NAVIGATION EVENTS <<<
*/
// DCM - APP
const DCM_AppController = ({path, uri}) => {
  path = path || '';
  uri = uri || '/';
  // App Core as reference in DOM
  let appCore = document.getElementById('DcmAppCore');
  // 
  let element = document.getElementById("DcmAppControl");
  if(element.src == ''){
    let DcmAppControl = APP_SRC + '/js/app.js';
    // script tag to replace  
    element.parentNode.removeChild(element);
    let script = document.createElement('script');
    script.onload = () => {
      DCM_ContentManager({uri:uri}); // Locate controller route's rules to load
    };
    script.type = "text/javascript";
    script.src = DcmAppControl;
    script.id = "DcmAppControl";
    appCore.parentNode.insertBefore(script, appCore.nextSibling);
  } else {
    DCM_ContentManager({uri:uri}); // Locate controller route's rules to load
  }  
}
// Set history URL avoid feedback on window.pushState
const pushHistoryURL = ({uri}) => {
  let host = PCI + '//' + HOST + APP_DIR;  
  let historyBack = host + uri;
  history.pushState({}, null, historyBack); // set browser history href referer simulation
}
// Dcm CATCH SELF APP NAVIGATION
const DCM_Href = (href) => {
  href = href || '';
  if(href == ''){ 
    // nothing
  } else {
  var lastChar = href[href.length -1];
    if(lastChar == '#'){
      // no window content to update
    } else {
      let get_uri = href.split(HOST + APP_DIR);    
      var uri = get_uri[1];
      var dir = uri.split('/');
      var depth = dir.length;
      if(depth >= 1){
        DCM_AppController({path:depth, uri:uri});
        pushHistoryURL({uri});
      } else {
        alert('DCM Href Error');
      }
    }
  }
}
const DCM_HrefEvent = (e) => {  
  var href = String(e.target);
  if(href == ''){ 
    // nothing
  } else {
  var lastChar = href[href.length -1];
    if(lastChar == '#'){
      // no window content to update
    } else {      
      let get_uri = href.split(HOST + APP_DIR);
      var uri = get_uri[1];
      var dir = uri.split('/');
      var depth = dir.length;
      if(depth >= 1){
        DCM_AppController({path:depth, uri:uri});
        pushHistoryURL({uri});
      } else {
        alert('DCM Href Error');
      }
    }
  }
}
// DCM - APP ON REMOTE HREF
const DCM_Index = () => {
  var href = window.location.href;
  var lastChar = href[href.length -1];
  if(lastChar == '#'){
    // no window content to update
  } else {
    let get_uri = href.split(HOST + APP_DIR);    
    var uri = get_uri[1];
    var dir = uri.split('/');
    var depth = dir.length;
    if(depth >= 1){
      DCM_AppController({path:depth, uri:uri});
      pushHistoryURL({uri});
    } else {
      alert('DCM Index Error');
    }
  }
}
// DCM - APP WINDOW HISTORY
const DCM_History = (uri) => {
  let get_uri = uri.split(HOST + APP_DIR);    
  var uri = get_uri[1];
  var dir = uri.split('/');
  var depth = dir.length;
  if(depth >= 1){    
    DCM_AppController({path:depth, uri:uri});
    // Do not push window history here
  } else {
    alert('DCM History Error');
  }    
}

/* block
  >>> DCM - WINDOW EVENTS <<<
*/
// DCM - CATCH WINDOWS WHEN IT WAS REFERRED
window.onload = () => {
  DCM_Index();
}
// DCM - CATCH EVERY WINDOW CLICK ON "A" TAG
window.onclick = (e) => {  
  if(e.target.nodeName === 'A'){ // event itself
    var element = e.target;
    if (element.getAttributeNode("disabled") !== null) {
      //var disabled = element.getAttributeNode("disabled").value;       
      element.setAttributeNode.style = "pointer-events: none;";        
    } else {
      DCM_HrefEvent(e);
    }
    // this below lines avoid page to reload
    e.preventDefault(e);
    return false;
  } else if(e.target.parentNode.nodeName === 'A'){ // event as child element
    var element = e.target.parentNode;
    if (element.getAttributeNode("disabled") !== null) {
      element.setAttributeNode.style = "pointer-events: none;";        
    } else {
      DCM_Href(element.href);
    }
    // this below lines avoid page to reload
    e.preventDefault(e);
    return false;
  } else if(e.target.parentNode.parentNode.nodeName === 'A'){ // event as grandchild element
    var element = e.target.parentNode.parentNode;
    if (element.getAttributeNode("disabled") !== null) {
      element.setAttributeNode.style = "pointer-events: none;";        
    } else {
      DCM_Href(element.href);
    }
    // this below lines avoid page to reload
    e.preventDefault(e);
    return false;
  } else {
    // nothing
  }  
}
// DCM - MANAGING HISTORY BACK
window.onpopstate = (e) => {  
  var url = location.href;
  let content;
  // Browser won't give back window.location.host
  if(APP_LOC == 0){
    content = url;
  } else {
    content = url.split(HOST + APP_DIR)[1];
  }
  // Get content
  DCM_History(content);
  // this below lines avoid page to reload
  e.preventDefault(e);
  return false;
}