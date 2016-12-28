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
// gets assignment information from API
// callback gets error then assignments
function getAssignments(filter, startDate, endDate, token, cb) {
  var url = ('https://' + basename + '.myschoolapp.com/api/DataDirect/AssignmentCenterAssignments/?format=json&persona=2&filter='
    + filter + '&dateStart=' + formatDate(startDate) + '&dateEnd=' + formatDate(endDate) + '&t=' + token),
    xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() {
    cb(null, JSON.parse(xhr.responseText));
  };
  xhr.onerror = function(err) {
    cb(err, null);
  };
  xhr.send();
}

const API_STATUS_TODO = -1,
  API_STATUS_IN_PROGRESS = 0,
  API_STATUS_COMPLETED = 1;
// https://lwhs.myschoolapp.com/api/assignment2/assignmentstatusupdate/?format=json&assignmentIndexId=9523553&assignmentStatus=-1
// updates the status of an assignment
// id = the property "assignment_index_id" on an object in the array returned by getAssignments
// cb is passed the error if there is one
function updateAssignmentStatus(id, status, cb) {
  var url = 'https://' + basename + '.myschoolapp.com/api/assignment2/assignmentstatusupdate/?format=json&assignmentIndexId='
    + id + '&assignmentStatus=' + status,
    xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() {
    cb(null);
  };
  xhr.onerror = function(err) {
    cb(err);
  };
  xhr.send();
}

window.addEventListener('load', function() {
  document.getElementById('view-token').addEventListener('click', function() {
    document.getElementById('token').innerHTML = '<i>loading...</i>';
    getToken(function(t) {
      getAssignments(API_FILTER_ACTIVE, new Date(), new Date(), t, function(err, data) {
        document.getElementById('token').innerHTML = '<pre>' + JSON.stringify(data) + '</pre>';
      });
    });
  }, false);
}, false);
//checks if the user is logged in
//function isLoggedIn (token) {
//  getAssignments(API_FILTER_DUE, new Date(), new Date(), getToken());
  
