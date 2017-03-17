var apiKey = require('./../.env').apiKey;

function DoctorList(medicalIssue) {
  this.medicalIssue = medicalIssue;
}

DoctorList.prototype.populate = function() {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query=' + this.medicalIssue + '&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
   .then(function(result) {
      this.list = result.data.map(function(element) {
        return {
          address: element.practices[0].visit_address,
          practiceName: element.practices[0].name,
          phones: element.practices[0].phones,
          doctorFirstName: element.profile.first_name,
          doctorLastName: element.profile.last_name,
          doctorTitle: element.profile.title
        };
      });
      displayResults(this.list);
    })
   .fail(function(error) {
      console.log("fail");
    });
};

var displayResults = function(results) {
  $('#results').html('');
  $('#results').append("<h1>Search Results</h1><ul>");
  results.forEach(function(element) {
    $('#results').append(
      "<li>" + element.doctorFirstName + " " + element.doctorLastName + ", " + element.doctorTitle + "</li>"
    );
  });
  $('#results').append("</ul>");
  $('#results').show();
};

exports.doctorListModule = DoctorList;
