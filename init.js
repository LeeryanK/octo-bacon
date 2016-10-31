var bacon = new OctoBacon('#bacon-container', {lang: 'js', interval: 100}, {
  divClass: 'ob-output',
  taClass: 'ob-input'
}, 'bacon');

bacon.addLangSupport('js', 'langs/js/');