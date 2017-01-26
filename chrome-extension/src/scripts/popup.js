// which "instance" of the app we are using
// <this>.myschoolapp.com
var basename = 'lwhs';

/*
the assignment data is just an array
each object in it has the properties:
className
id
indexId (used for the updateAssignmentStatus)
type (eg "Homework")
title ("Read pp. 44-45")
description ("Read and annotate pages 44-45 in SOME BOOK I DON'T CARE. Be prepared for an in-class discussion.")
status (a number, this code also has constants ASSIGNMENT_STATUS_ (TODO, IN_PROGRESS, COMPLETED))

there is also getAssignmentUrl
that takes one of the assignments
and returns the url to view it on the website
i haven't figured out how to get information on links and downloads yet
*/

function parseAssignmentData(data) {
  return data.map(function(item) {
    return {
      className: item.groupname,
      id: item.assignment_id,
      indexId: item.assignment_index_id,
      type: item.assignment_type,
      title: item.short_description,
      description: item.long_description,
      status: item.assignment_status,

    };
  });
}

function getAssignmentUrl(a) {
  return 'https://' + basename + '.myschoolapp.com/app/student#assignmentdetail/' + a.id + '/' + a.indexId + '/0/studentmyday--assignment-center';
}

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
    cb(null, parseAssignmentData(JSON.parse(xhr.responseText)));
  };
  xhr.onerror = function(err) {
    cb(err, null);
  };
  xhr.send();
}

const ASSIGNMENT_STATUS_TODO = -1,
  ASSIGNMENT_STATUS_IN_PROGRESS = 0,
  ASSIGNMENT_STATUS_COMPLETED = 1;
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

module.exports = {
  getToken: getToken,
  formatDate: formatDate,
  getAssignments: getAssignments,
  getAssignmentUrl: getAssignmentUrl,
  API_FILTER_ASSIGNED: API_FILTER_ASSIGNED,
  API_FILTER_ACTIVE: API_FILTER_ACTIVE,
  API_FILTER_DUE: API_FILTER_DUE,
  ASSIGNMENT_STATUS_TODO: ASSIGNMENT_STATUS_TODO,
  ASSIGNMENT_STATUS_IN_PROGRESS: ASSIGNMENT_STATUS_IN_PROGRESS,
  ASSIGNMENT_STATUS_COMPLETED: ASSIGNMENT_STATUS_COMPLETED
};

// this is just a bunch of raw data from the api
// https://lwhs.myschoolapp.com/api/datadirect/AssignmentStudentDetail?format=json&studentId=4139755&AssignmentIndexId=9959651
/*
[
  {
    "title": "Finish Why Sex - the human psychology segment and questions. 40 minutes - 56 minutes",
    "description": "",
    "adateTicks": 636198624000000000,
    "adate": "1/13/2017 12:00 AM",
    "ddateTicks": 636204671400000000,
    "ddate": "1/19/2017 11:59 PM",
    "sectionName": "Biology - 5 (F)",
    "assignmentType": "Homework",
    "dbid": null,
    "dbDetail": null,
    "readyInd": null,
    "lastSubmitDate": null,
    "dbFileDescription": null,
    "dbFileName": null,
    "dbFileId": null,
    "fileTypeId": null,
    "userFolderId": null,
    "fileSize": null,
    "externalId": null,
    "pointsEarned": null,
    "valueId": null,
    "Letter": null,
    "maxPoints": 10,
    "assignmentStatus": 4,
    "googleExternalId": null,
    "googleExternalUrl": null,
    "googleDocInd": false,
    "tolken": "",
    "uuid": "XwtCURZXV30%3d"
  }
]
*/
