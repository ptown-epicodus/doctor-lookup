var DoctorList = require('./../js/doctor.js').doctorListModule;

$(document).ready(function() {
  $('form#query').submit(function(event) {
    event.preventDefault();
    var medicalIssue = $('[name=medical-issue]').val();
    $('[name=medical-issue]').val('');
    var doctorList = new DoctorList(medicalIssue);
    doctorList.populate();
  });
});
