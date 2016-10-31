(function() {
  /**
   * @constructor OctoBacon
   * Class for a text-editor
   * @param {string} querySelectorString The query selector string for the
   *   container div.
   * @param {object} highlightingOptions The language to use syntax
   *   highlighting for.
   * @param {object} styleClasses The class names for elements to be assigned.
   * @param {string} exportObj The global variable name for async scripts to
   *   things to.
   */
  function OctoBacon(querySelectorString, highlightingOptions, styleClasses, exportObj) {
    var lang = highlightingOptions.lang;
    var interval = highlightingOptions.interval;
    this.container_ = document.querySelector(querySelectorString);
    this.styles = styleClasses;
    this.langs = {};
    this.highlightingOptions = {
      lang: lang,
      interval: interval
    };
    this.exportObj = exportObj;
    this.createAndSetUpElements_();

    if (lang in this.langs) {
      this.startHighlighting();
    } else {
      this.needsHighlighting_ = true;
    }
  }

  /**
   * @function Creates the elements needed for the text editor, excluding style
   *   sheets.
   */
   OctoBacon.prototype.createAndSetUpElements_ = function() {
     var textarea = document.createElement('textarea');
     var div = document.createElement('div');

     textarea.width = this.container_.width;
     textarea.height = this.container_.height;
     textarea.classList.add(this.styles.taClass);
     div.width = this.container_.width;
     div.height = this.container_.height;
     div.classList.add(this.styles.divClass);

     textarea.addEventListener('scroll', function() {
       div.scrollTop = textarea.scrollTop;
     });
     this.container_.appendChild(textarea);
     this.container_.appendChild(div);

     this.textarea = textarea;
     this.div = div;
   };

  OctoBacon.prototype.startHighlighting = function() {
    this.highlighterIntervalId_ = window.setInterval((function() {
      this.highlightUsing_(this.langs[this.highlightingOptions.lang].highlight);
    }).bind(this), this.highlightingOptions.interval);
  };

  OctoBacon.prototype.stopHighlighting = function() {
    window.clearInterval(this.highlighterIntervalId_);
  };
  
  /**
   * @param {function(string):string} highlight A highlighting function that takes the unhighlighted text and returns the highlighted text.
   */
  OctoBacon.prototype.highlightUsing_ = function(highlight) {
    this.div.innerHTML = highlight(this.textarea.value);
  };

  OctoBacon.prototype.needsHighlighting_ = false;

  /**
   * Loads support for a language from a base path URL.
   * @param {string} langName The name of the language.
   * @param {string} pathName The base URL for the language. The director must
   *   have a /lang.js and a /lang.css in it.
   */
  OctoBacon.prototype.addLangSupport = function(langName, pathName) {
    console.log('Loading syntax highlighter for ' + langName);
    var script = document.createElement('script');
    var styleTag = document.createElement('link');
    var head = document.getElementsByTagName('head')[0];

    if (pathName.substring(pathName.length - 1) !== '/') {
      pathName += '/';
    }

    script.src = pathName + 'lang.js';
    styleTag.href = pathName + 'lang.css';
    styleTag.rel = 'stylesheet';

    script.setAttribute('data-export-obj', this.exportObj);
    script.setAttribute('data-export-name', langName);

    head.appendChild(script);
    head.appendChild(styleTag);
  };

  window['OctoBacon'] = OctoBacon;
})();
