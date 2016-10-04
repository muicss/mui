window.addEventListener('load', function() {
  var doc = document;

  // add html reset button
  var el = doc.createElement('button');
  el.className = 'mui-btn mui-btn--primary';
  el.innerHTML = 'Reset HTML';
  el.onclick = function() {
    var html = doc.body.innerHTML;
    doc.body.innerHTML = '';
    setTimeout(function() {doc.body.innerHTML = html;}, 500);
  }
  doc.body.insertBefore(el, doc.body.children[0]);

});
