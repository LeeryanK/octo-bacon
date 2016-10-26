(function() {
  /**
   * @constructor OctoBacon
   * Class for a text-editor
   * @param {string} querySelectorString The query selector string for the
   *   container div.
   * @param {object} syntaxHighlightingLanguage The language to use syntax
   *   highlighting for.
   * @param {object} styleClasses The class names for elements to be assigned.
   */
  function OctoBacon(querySelectorString, syntaxHighlighter, styleClasses) {
    this.container_ = document.querySelector(querySelectorString);
    this.styles = styleClasses;
    this.createAndSetUpElements_();

    var lang = syntaxHighlighter.language;
    var interval = syntaxHighlighter.interval;
    if (lang in OctoBacon.highlighters && interval > 0) {
      this.highlighterIntervalId = window.setInterval(function() {
        OctoBacon.highlighters[lang].highlight(this);
      }, interval);
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

    function OctoBaconSyntaxHighlighter(styles, highlight) {
      var style = document.createElement('style');
      var css = '';
      for (var htmlClass in styles) {
        var color = styles[htmlClass];
        css += ('.' + htmlClass + '{' + 'color: ' + color + ';}\n');
      }
      style.innerHTML = css;
      document.getElementsByTagName('head')[0].appendChild(style);

      this.stylesObj = styles;
      this.highlight = function(octoBaconInstance) {
        var highlightedText = highlight(octoBaconInstance.textarea.value);
        octoBaconInstance.div.innerHTML = highlightedText;
      };
    }

    OctoBacon.highlighters = {};

    OctoBacon.highlighters.js = new OctoBaconSyntaxHighlighter({
      'ob-js-kw': 'purple', // keywords
      'ob-js-bnun': 'cyan', // booleans, null, undefined, numbers
      'ob-js-str': 'blue', // strings
      'ob-js-fm': 'magenta', // function or method
    }, function(text) {
      var strReg = /'[^']*'/g;
      var strReg2 = /"[^"]*"/g;
      var bnunReg = /\b(\d|true|false|null|undefined)\b/g;
      var keywordReg = /\b(var|let|const|function|class|if|else|while|for|in|of|switch|case|try|catch|throw|finally|void|continue|break|return|do)\b/g;
      var funcReg = /\b(\w*())\b/g;

      return text.replace(strReg, '<span class="ob-js-str">$&</span>').
        replace(strReg2, '<span class="ob-js-str">$&</span>').
        replace(bnunReg, '<span class="ob-js-bnun">$1</span>').
        replace(keywordReg, '<span class="ob-js-kw">$1</span>').
        replace(funcReg, '<span class="ob-js-fm">$1</span>');
    });
  
  window['OctoBacon'] = OctoBacon;
})();
