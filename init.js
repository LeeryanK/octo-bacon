var bacon = new OctoBacon('#bacon-container', {lang: 'js', interval: 100}, {
  divClass: 'ob-output',
  taClass: 'ob-input'
});

OctoBacon.addHighlighter('js', 'themes/js/', 'bacon');