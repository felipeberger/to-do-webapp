var populateAll = function () {
  var getAllData = function () {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=177',
      dataType: 'json',
      success: function (response) {
        // return response
        // console.log(response);
        populateAllHelper(response)
      },

      error: function (request, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  var populateAllHelper = function(elem) {
    elem.tasks.forEach(function (item) {
      console.log(item['content']);
      $('.task-list').prepend(
        '<div class="task">' +
          '<hr>' +
          '<i class="far fa-square pr-3"></i>' +
          '<p class="d-inline">' + item['content'] + '</p>' +
        '</div>'
      )
    })
  };
  getAllData();
};

// $.ajax({
//   type: 'POST',
//   url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=177',
//   contentType: 'application/json',
//   dataType: 'json',
//   data: JSON.stringify({
//     task: {
//       content: 'pay bills'
//     }
//   }),
//   success: function (response, textStatus) {
//     console.log(response);
//   },
//   error: function (request, textStatus, errorMessage) {
//     console.log(errorMessage);
//   }
// });

// $.ajax({
//   type: 'DELETE',
//   url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/2533?api_key=177',
//   success: function (response, textStatus) {
//     console.log(response);
//   },
//   error: function (request, textStatus, errorMessage) {
//     console.log(errorMessage);
//   }
// })

// populate list on DOM load
$(document).ready(function() {
  populateAll();
});
