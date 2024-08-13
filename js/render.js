const queryString = window.location.search;

(function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const blog_name = urlParams.get('blogs')
  var file = file || blog_name;
  var reader = new stmd.DocParser();
  var writer = new stmd.HtmlRenderer();
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200) {
      display(xhr);
    }
  };

  function display(xhr) {
    var parsed = reader.parse(xhr.responseText);
    var content = writer.renderBlock(parsed);
    document.getElementsByTagName('mdtag')[0].innerHTML = content;
    
    /* try to extract h1 title and use as title for page
       if no h1, use name of file 
    */
    try {
      document.title = document.querySelector('h1').textContent
    } catch (e) {
      document.title = file;
    }
  }

  xhr.open('GET', file);
  xhr.send();
})();

