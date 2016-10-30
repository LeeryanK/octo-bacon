(function() {
  /**
   * @constructor OctoBacon
   * Class for a text-editor
   * @param {string} querySelectorString The query selector string for the
   *   container div.
   * @param {object} highlightingOptions The language to use syntax
   *   highlighting for.
   * @param {object} styleClasses The class names for elements to be assigned.
   */
  function OctoBacon(querySelectorString, highlightingOptions, styleClasses) {
    var lang = highlightingOptions.lang;
    var interval = highlightingOptions.interval;
    this.container_ = document.querySelector(querySelectorString);
    this.styles = styleClasses;
    this.highlighters = {};
    this.highlightingOptions = {
      lang: lang,
      interval: interval
    };
    this.createAndSetUpElements_();

    if (lang in this.highlighters) {
      this.startHighlighting();
    } else {
      this.needsToStartHighlighting_ = true;
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
      this.highlighters[this.highlightingOptions.lang].highlight(this);
    }).bind(this), this.highlightingOptions.interval);
  };

  OctoBacon.prototype.stopHighlighting = function() {
    window.clearInterval(this.highlighterIntervalId_);
  };

  OctoBacon.prototype.needsToStartHighlighting_ = false;

  /**
   * @static
   * Loads a syntax highlighter language from a base path URL.
   * @param {string} langName The name of the language.
   * @param {string} pathName The base URL for the language. The director must
   *   have a /lang.js and a /lang.css in it.
   * @param {string} exportObj Which global object to append the language to.
   */
  OctoBacon.addHighlighter = function(langName, pathName, exportObj) {
    console.log('Loading syntax highlighter for ' + langName);
    var script = document.createElement('script');
    var styleTag = document.createElement('link');
    var head = document.getElementsByTagName('head')[0];

    if (pathName.substring(pathName.length - 1) !== '/') {
      pathName += '/';
    }

    script.src = pathName + 'lang.js';
    styleTag.href = pathName + 'lang.css';

    script.setAttribute('data-export-obj', exportObj);
    script.setAttribute('data-export-name', langName);

    head.appendChild(script);
    head.appendChild(styleTag);
  };

  window['OctoBacon'] = OctoBacon;
})();
