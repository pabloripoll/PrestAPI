/*
JS Dynamic Contents Manager.
This script will be loaded once when application is executed
*/

/* Remove given element */
const removeElement = (elms) => elms.forEach(el => el.remove());

/* Process View Cover */
const loadingCover = ({state, theme}) => {
  state = state || false;
  theme = theme || 'dark';
  if(state){
    var div = document.createElement('div');
    //div.id = 'body-cover';
    div.className = `body-cover body-cover-${theme} block`;
    document.body.appendChild(div);
    div.innerHTML = '<div class="loader"></div>';
  } else {
    let element = document.querySelector('.body-cover');
    setTimeout( () => {
      element.classList.remove('block');
      element.classList.add('none');
      element.parentNode.removeChild(element);
    }, 1000);
  }
}

/* Hash Code */
var hashMix = (length) => {
  var hash = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    hash += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return hash;
};

/* Modal Dialog */
class ModalWindow {
  constructor(options) {
    this.opts = Object.assign({}, ModalWindow._defaultOptions, options)
    this.modal = document.querySelector(this.opts.selector)
    this.initialize()
    this.addEventHandlers()
    this.afterRender()
  }
  initialize() {
    if (this.opts.headerText) {
      this.query('.modal-dlg-header-text').textContent = this.opts.headerText
    }
    if (this.opts.htmlContent) {
      this.query('.modal-dlg-content').innerHTML = this.opts.htmlContent
    } else if (this.opts.textContent) {
      this.query('.modal-dlg-content').textContent = this.opts.textContent
    }
    if (this.opts.theme) {
      // remove before theme set if exists
      this.modal.classList.remove(`modal-theme-dark`);
      this.modal.classList.remove(`modal-theme-light`);
      // add new theme set
      this.modal.classList.add(`modal-theme-${this.opts.theme}`)
    }
  }
  addEventHandlers() {
    this.query('.modal-dlg-header-close-btn').addEventListener('click', (e) => {
      this.setVisible(false)
    })
    if (this.opts.mode !== false) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.setVisible(false)
        }
      })
    }
  }
  afterRender() {
    if (this.opts.show === true) { this.setVisible(true); }
  }
  setVisible(visible) {
    this.modal.classList.toggle('modal-dlg-visible', visible)
    if (visible) {
       this.onOpen() // class method override or callback (below)
       if (typeof this.opts.onOpen === 'function') {
        this.opts.onOpen(this.modal)
       }
    } else {
      this.onClose() // class method override or callback (below)
      if (typeof this.opts.onClose === 'function') {
        this.opts.onClose(this.modal)
       }
    }
  }
  query(childSelector) {
    return this.modal.querySelector(childSelector)
  }
  // Example hooks
  onOpen() { }
  onClose() { } 
}
ModalWindow._defaultOptions = {
  selector: '.modal-dlg',
  show: false,
  mode: true // When click outside modal dialogue "true" to allow or "false" to disallow action
}

/* Custom Modal Objects */
class MyCustomModalWindow extends ModalWindow {
  constructor(options) {
    super(options)
  }
  onOpen() {
    //console.log('Opened!') // or you can use generics options.onOpen
  }
  onClose() {    
    //console.log('Closed!') // or you can use generics options.onClose
  }
}
