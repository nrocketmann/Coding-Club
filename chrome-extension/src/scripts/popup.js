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

export default {getToken, formatDate, getAssignments, getAssignmentUrl, API_FILTER_ASSIGNED, API_FILTER_ACTIVE, API_FILTER_DUE, ASSIGNMENT_STATUS_TODO, ASSIGNMENT_STATUS_IN_PROGRESS, ASSIGNMENT_STATUS_COMPLETED};

// this is just a bunch of raw data from the api
/*
[
  {
    "groupname": "English 1 - 1",
    "section_id": 3188664,
    "assignment_id": 6632558,
    "short_description": "Homework 1/12",
    "date_assignedTicks": 636197760000000000,
    "date_assigned": "1/12/2017 12:00 AM",
    "date_dueTicks": 636203807400000000,
    "date_due": "1/18/2017 11:59 PM",
    "drop_box_late_timeTicks": 599266943400000000,
    "drop_box_late_time": "1/1/1900 11:59 PM",
    "long_description": "<!--StartFragment-->\n<div><span>Read and annotate: &#8220;Self-Portrait of the Artist as Ungrateful Black Writer&#8221; (essay) and &#8220;Last Portrait as Boy&#8221; (poem), both by </span><span>Saeed</span><span> Jones. While Jones does not employ a fixed form like the sestina, the arrangement of the poem is still important. Try to figure out why/how.&#160;</span></div>\n<!--EndFragment-->",
    "assignment_index_id": 9960085,
    "assignment_type": "Homework",
    "inc_grade_book": false,
    "publish_grade": true,
    "enroll_count": 0,
    "graded_count": 0,
    "drop_box_id": null,
    "drop_box_ind": false,
    "has_link": false,
    "has_download": false,
    "assignment_status": 1,
    "assessment_ind": false,
    "assessment_id": null,
    "assessment_locked": false,
    "show_report": null,
    "has_grade": false,
    "local_nowTicks": 636203241504000000,
    "local_now": "1/18/2017 8:15 AM",
    "major": false,
    "lti_ind": false,
    "lti_config_ind": false,
    "lti_provider_name": null,
    "discussion_ind": false,
    "share_discussion": true,
    "show_discussion_ind": false,
    "allow_discussion_attachment": true
  },
  {
    "groupname": "Deductive Geometry - 4",
    "section_id": 3188774,
    "assignment_id": 6640302,
    "short_description": "Do the attached problems in supplement ch 7 (on the bulletin board).<br />If you would like a paper copy of the supp, stop by the math office. &#160;<br />Be sure that direct proofs are complete, with correct reasons. &#160;<br /><b><br /></b>",
    "date_assignedTicks": 636198624000000000,
    "date_assigned": "1/13/2017 12:00 AM",
    "date_dueTicks": 636204671400000000,
    "date_due": "1/19/2017 11:59 PM",
    "drop_box_late_timeTicks": 599266943400000000,
    "drop_box_late_time": "1/1/1900 11:59 PM",
    "long_description": "<b>p239</b>&#160;8-16,&#160;<br /><b>p242</b>&#160;28-31, 1-4,<b>&#160;<br />p243</b>&#160;12-25,&#160;<br /><b>p244</b>&#160;28, 31,&#160;<br /><b>p249</b>&#160;5-12, 20-27,<br /><b>p250</b>&#160;29 &#160;",
    "assignment_index_id": 9973825,
    "assignment_type": "Homework",
    "inc_grade_book": true,
    "publish_grade": true,
    "enroll_count": 0,
    "graded_count": 0,
    "drop_box_id": null,
    "drop_box_ind": false,
    "has_link": false,
    "has_download": false,
    "assignment_status": -1,
    "assessment_ind": false,
    "assessment_id": null,
    "assessment_locked": false,
    "show_report": null,
    "has_grade": false,
    "local_nowTicks": 636203241504000000,
    "local_now": "1/18/2017 8:15 AM",
    "major": false,
    "lti_ind": false,
    "lti_config_ind": false,
    "lti_provider_name": null,
    "discussion_ind": false,
    "share_discussion": true,
    "show_discussion_ind": false,
    "allow_discussion_attachment": true
  },
  {
    "groupname": "Design & Technology - Screwdriver",
    "section_id": 3188852,
    "assignment_id": 6561456,
    "short_description": "<span>&#160;</span><span id=\"docs-internal-guid-eaa6c544-a364-d08d-5f8a-646991c70246\">Build a&#160;<b>capacitor</b>&#160;circuit on 123D circuits.</span>",
    "date_assignedTicks": 636198624000000000,
    "date_assigned": "1/13/2017 12:00 AM",
    "date_dueTicks": 636204671400000000,
    "date_due": "1/19/2017 11:59 PM",
    "drop_box_late_timeTicks": 599266943400000000,
    "drop_box_late_time": "1/1/1900 11:59 PM",
    "long_description": "<div><a href=\"https://123d.circuits.io/circuits/666707#scrolltovideo\">https://123d.circuits.io/circuits/666707#scrolltovideo</a></div>\n<span><br /></span>\n<div>Try some different capacitor and resistor values to see how they change the circuit.</div>\n<span id=\"docs-internal-guid-eaa6c544-a365-6610-a1ae-604d23385a21\">put screenshot of your circuit in shared drive folder.</span>",
    "assignment_index_id": 9831007,
    "assignment_type": "Homework",
    "inc_grade_book": true,
    "publish_grade": true,
    "enroll_count": 0,
    "graded_count": 0,
    "drop_box_id": null,
    "drop_box_ind": false,
    "has_link": false,
    "has_download": false,
    "assignment_status": -1,
    "assessment_ind": false,
    "assessment_id": null,
    "assessment_locked": false,
    "show_report": null,
    "has_grade": false,
    "local_nowTicks": 636203241504000000,
    "local_now": "1/18/2017 8:15 AM",
    "major": false,
    "lti_ind": false,
    "lti_config_ind": false,
    "lti_provider_name": null,
    "discussion_ind": false,
    "share_discussion": true,
    "show_discussion_ind": false,
    "allow_discussion_attachment": true
  },
  {
    "groupname": "Spanish 2 Accelerated - 1",
    "section_id": 3188883,
    "assignment_id": 6631689,
    "short_description": "Mandatos Informales (t&#250;) y nuevo vocabulario (de la cocina)",
    "date_assignedTicks": 636197760000000000,
    "date_assigned": "1/12/2017 12:00 AM",
    "date_dueTicks": 636203250000000000,
    "date_due": "1/18/2017 8:30 AM",
    "drop_box_late_timeTicks": 599266386000000000,
    "drop_box_late_time": "1/1/1900 8:30 AM",
    "long_description": "1. Haz los ejercicios en l&#237;nea de mandatos informales. Toma fotos de la pantalla y entr&#233;gamelas en UN documento<br />2. Estudia el vocabulario de la cocina en Quizlet.<br />3. Va a haber una prueba pronto de los mandatos.",
    "assignment_index_id": 9958612,
    "assignment_type": "Engagement",
    "inc_grade_book": true,
    "publish_grade": true,
    "enroll_count": 0,
    "graded_count": 0,
    "drop_box_id": 1261987,
    "drop_box_ind": true,
    "has_link": true,
    "has_download": false,
    "assignment_status": 1,
    "assessment_ind": false,
    "assessment_id": null,
    "assessment_locked": false,
    "show_report": null,
    "has_grade": false,
    "local_nowTicks": 636203241504000000,
    "local_now": "1/18/2017 8:15 AM",
    "major": false,
    "lti_ind": false,
    "lti_config_ind": false,
    "lti_provider_name": null,
    "discussion_ind": false,
    "share_discussion": true,
    "show_discussion_ind": false,
    "allow_discussion_attachment": true
  },
  {
    "groupname": "Biology - 5",
    "section_id": 3188801,
    "assignment_id": 6632299,
    "short_description": "Finish Why Sex - the human psychology segment and questions. 40 minutes - 56 minutes",
    "date_assignedTicks": 636198624000000000,
    "date_assigned": "1/13/2017 12:00 AM",
    "date_dueTicks": 636204671400000000,
    "date_due": "1/19/2017 11:59 PM",
    "drop_box_late_timeTicks": 599266943400000000,
    "drop_box_late_time": "1/1/1900 11:59 PM",
    "long_description": "",
    "assignment_index_id": 9959651,
    "assignment_type": "Homework",
    "inc_grade_book": true,
    "publish_grade": true,
    "enroll_count": 0,
    "graded_count": 0,
    "drop_box_id": null,
    "drop_box_ind": false,
    "has_link": true,
    "has_download": true,
    "assignment_status": -1,
    "assessment_ind": false,
    "assessment_id": null,
    "assessment_locked": false,
    "show_report": null,
    "has_grade": false,
    "local_nowTicks": 636203241504000000,
    "local_now": "1/18/2017 8:15 AM",
    "major": false,
    "lti_ind": false,
    "lti_config_ind": false,
    "lti_provider_name": null,
    "discussion_ind": false,
    "share_discussion": true,
    "show_discussion_ind": false,
    "allow_discussion_attachment": true
  },
  {
    "groupname": "Biology - 5",
    "section_id": 3188801,
    "assignment_id": 6632331,
    "short_description": "PSA - create or find an image or two that might be used for your announcement. Also, write an informational blurb (2-3 sentences) that further describes the issue.&#160;",
    "date_assignedTicks": 636198624000000000,
    "date_assigned": "1/13/2017 12:00 AM",
    "date_dueTicks": 636204671400000000,
    "date_due": "1/19/2017 11:59 PM",
    "drop_box_late_timeTicks": 599266943400000000,
    "drop_box_late_time": "1/1/1900 11:59 PM",
    "long_description": "",
    "assignment_index_id": 9959715,
    "assignment_type": "Project",
    "inc_grade_book": true,
    "publish_grade": true,
    "enroll_count": 0,
    "graded_count": 0,
    "drop_box_id": null,
    "drop_box_ind": false,
    "has_link": false,
    "has_download": false,
    "assignment_status": -1,
    "assessment_ind": false,
    "assessment_id": null,
    "assessment_locked": false,
    "show_report": null,
    "has_grade": false,
    "local_nowTicks": 636203241504000000,
    "local_now": "1/18/2017 8:15 AM",
    "major": true,
    "lti_ind": false,
    "lti_config_ind": false,
    "lti_provider_name": null,
    "discussion_ind": false,
    "share_discussion": true,
    "show_discussion_ind": false,
    "allow_discussion_attachment": true
  }
]
*/
