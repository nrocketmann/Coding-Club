// which "instance" of the app we are using
// <this>.myschoolapp.com
var basename = 'lwhs';

// retrieves the token cookie and calls a callback function with the token
function getToken(cb) {
  chrome.cookies.get({
    url: basename + '.myschoolapp.com/',
    name: 't'
  }).then(cb);
}

window.addEventListener('load', function() {
  document.getElementById('view-token').onclick = function() {
    getToken(function(t) {
      document.getElementById('token').textContent = t;
    });
  };
});
