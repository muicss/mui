window.addEventListener('load', function() {
  // fetch link element
  var selector = 'link[href="../assets/mui/css/mui.css"]',
      linkEl = document.querySelector(selector);

  // build element
  var selectEl = document.createElement('select');
  selectEl.innerHTML = [
    '<optgroup label="Basic">',
    '<option value="mui.css" selected>mui.css</option>',
    '<option value="mui.min.css">mui.min.css</option>',
    '</optgroup>',

    '<optgroup label="No Globals">',
    '<option value="mui-noglobals.css">mui-noglobals.css</option>',
    '<option value="mui-noglobals.min.css">mui-noglobals.min.css</option>',
    '</optgroup>',

    '<optgroup label="Right-to-left">',
    '<option value="mui-rtl.css">mui-rtl.css</option>',
    '<option value="mui-rtl.min.css">mui-rtl.min.css</option>',
    '<option value="mui-noglobals-rtl.css">mui-noglobals-rtl.css</option>',
    '<option value="mui-noglobals-rtl.min.css">mui-noglobals-rtl.min.css</option>',
    '</optgroup>'
  ].join('');

  selectEl.style.position = 'absolute';
  selectEl.style.top = '0px';
  selectEl.style.right = '0px';

  // change css file
  selectEl.addEventListener('change', function(ev) {
    linkEl.href = '../assets/mui/css/' + this.value + '?' + (new Date());
  });

  document.body.appendChild(selectEl);
});
