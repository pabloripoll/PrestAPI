/*
JS Dynamic Contents Manager.
This script will be loaded every time content was called
*/

/* WEBSITE PUBLIC APP */
var plusDocTitle = ' - PrestAPI';

// EXAMPLES
var Page_Examples = (page) => {
  content = page.content;
  uri = page.uri;  
  // Update window document
  document.title = 'Examples Page' + plusDocTitle;
  // JS scripts
  let scripts = [
    {src: APP_SRC + '/pages/'+content+'/'+content+'.js'}
  ];
  // Set content
  getPageContent({content:content, scripts:scripts});
}

// CONTACTS
var Page_Contact = (page) => {
  content = page.content;
  // Update window document
  document.title = 'Contact Page' + plusDocTitle;
  // Set content
  getPageContent({content:content});
}

// INDEX - HOME
var Page_Home = (page) => {
  content = page.content;
  // Update window document
  document.title = 'Home Page' + plusDocTitle;
  // Set content
  getPageContent({content:content});
}

// PAGES CONTENT MANAGEMENT
var DCM_ContentManager = ({uri}) => {
  // Default values
  let page; let query; let scripts;
  // Parse URI
  uri = uri || '/'; // if uri is empty replace it with a forward slash
  uri = uri.slice(1); // remove first forward slash
  let array = uri.split('.html');
  // Page Content
  page = array[0]; // remove from .html  
  if(page == '') page = 'home'; // Difine default page
  // URI Query
  if(array[1]){
    query = array[1];
  }
  // Build function name and manage page content if it exists
  var fname = 'Page_' + page.charAt(0).toUpperCase() + page.slice(1);
  if (typeof window[fname] === 'function') { 
    window[fname]({content:page, uri:uri});
  } else {
    console.log(page + ' content is not defined!');
  }
}
