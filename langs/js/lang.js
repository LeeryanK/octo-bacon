(function() {
  var bacon = window[document.currentScript.getAttribute('data-export-obj')];
  var langName = document.currentScript.getAttribute('data-export-name');
  var js;

  bacon.langs[langName] = {};
  js = bacon.langs[langName];

  js.highlight = function highlightJS(text) {
    var strSingleQuoteReg = /'(\\'|[^'])*'/g;
    var strDoubleQuoteReg = /"(\\"|[^"])*"/g;
    var keywordOrOpReg = /\b(new|var|if|do|function|while|switch|for|foreach|in|continue|break)(?=[^\w])/g;
    var specialReg = /\b(this|arguments|global|require|document|window|Array|String|Object|Number|Date|Math|RegExp|Error|Boolean|Function|Symbol|JSON|Map|Set|Generator)(?=[^\w])/g;
    var funcCallReg = /\b([a-zA-z_][a-zA-z_\d]*)\(([\d]*|[a-zA-z_][a-zA-z_\d]*)(\,(\w*)([\d]*|[a-zA-z_][a-zA-z_\d]*))*\)(?=[^\w])/g;
    var multiLineCommentReg  = /(\/\*.*\*\/)/g;
    var oneLineCommentReg = /(\/\/.*)/g;
    var bnunReg = /\b(true|false|null|undefined|[\d])(?=[^\w])/g;
    /** @todo Add special object support using https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects*/

    text = text.replace(strDoubleQuoteReg, '<span class="ob-js-str">$&</span>');
    text = text.replace(strSingleQuoteReg, '<span class="ob-js-str">$&</span>');
    text = text.replace(keywordOrOpReg, '<span class="ob-js-kwo">$1</span>');
    text = text.replace(specialReg, '<span class="ob-js-sp">$1</span>');
    text = text.replace(funcCallReg, '<span class="ob-js-fm">$1</span>($2)');
    text = text.replace(multiLineCommentReg, '<span class="ob-js-com">$1</span>');
    text = text.replace(oneLineCommentReg, '<span class="ob-js-com">$1</span>');
    text = text.replace(bnunReg, '<span class="ob-js-bnun">$1</span>');

    return text;
  };

  js.interceptKeystroke = function interceptJS() {

  };

  if (bacon.needsHighlighting_) {
    bacon.startHighlighting();
  }
})();
