// which "instance" of the app we are using
// <this>.myschoolapp.com
var basename = 'lwhs';

// retrieves the token cookie and calls a callback function with the token
function getToken(cb) {
  chrome.cookies.get({
    url: 'https://' + basename + '.myschoolapp.com/',
    name: 't'
  }, function(cookie) {
    cb(cookie === null ? null : cookie.value);
  });
}

function formatDate(d) {
  return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
}

const API_FILTER_ASSIGNED = 0,
  API_FILTER_ACTIVE = 2,
  API_FILTER_DUE = 1;
// https://lwhs.myschoolapp.com/api/DataDirect/AssignmentCenterAssignments/?format=json&filter=2&dateStart=11/6/2016&dateEnd=11/6/2016&persona=2&statusList=&sectionList=
// gets assignment information from API
function getAssignments(filter, startDate, endDate, token, cb) {
  var url = 'https://' + basename + '.myschoolapp.com/api/DataDirect/AssignmentCenterAssignments/?format=json&persona=2&filter='\
    + filter + '&dateStart=' + formatDate(startDate) + '&dateEnd=' + formatDate(endDate) + '&t=' + token,
    xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() {
    // todo
  };
  xhr.send();
}

document.getElementById('view-token').addEventListener('click', function() {
  document.getElementById('token').innerHTML = '<i>loading...</i>';
  getToken(function(t) {
    if (t === null) document.getElementById('token').innerHTML = 'null';
    else document.getElementById('token').innerHTML = t;
  });
}, false);
