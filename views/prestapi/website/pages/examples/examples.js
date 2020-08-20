

/* Modal Actions Examples */
var modal_example = ({options}) => {
  options = options;
  let mode = options.mode || true; // BUG
  let theme = options.theme || 'light';
  let header = options.header || 'empty header text';
  let body = options.body || 'empty body content';
  new MyCustomModalWindow({
    show: true, // Show the modal on creation
    mode: mode, // Allow click outside to close
    headerText: header,
    htmlContent: body,
    theme : theme,
    onClose : (self) => {
      //console.log('Another close hook...')
    }
  })
}

var modalCall_Action = (e) => {
  let target = e.target.dataset.target;
  if(target == 'modal-example-dark' || target == 'modal-example-light'){
    let options = {};
    if(target == 'modal-example-dark'){
      options = {
        theme: 'dark',
        mode: false,
        header: 'Modal Dark Theme',
        body: '<p>This example is a fancy theme style to mix with site design color pallete.</p>',
      };
    }
    if(target == 'modal-example-light'){
      options = {
        theme: 'light',
        mode: true,
        header: 'Modal Light Example',
        body: '<p>This fancy theme light style to call general system information.</p>',
      };
    }    
    modal_example({options});
  }
}
var modalCall = document.getElementsByClassName("modal-call-btn");
for (let i = 0; i < modalCall.length; i++) {  
  modalCall[i].addEventListener('click', modalCall_Action, false);
}