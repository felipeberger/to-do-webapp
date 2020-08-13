// task populating methods
var populateAll = function() {
  var getAllData = function() {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=177',
      dataType: 'json',
      success: function (response) {
        populateAllHelper(response);
      },

      error: function(request, errorMessage) {
        console.log(errorMessage);
      }
    });
  };

  var populateAllHelper = function(elem) {
    elem.tasks.forEach(function (item) {
      $('.task-list').prepend(
        '<div class="task" id=' + item['id'] + '>' +
          '<hr>' +
          '<i class="far fa-square pr-3"></i>' +
          '<p class="d-inline">' + item['content'] + '</p>' +
        '</div>'
      )
    })
  };
  getAllData();
};

var uploadSingleEntry = function(entry) {
  $.ajax({
    type: 'POST',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=177',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: entry
      }
    }),
    success: function (response, textStatus) {
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var deleteSingleEntry = function(entry) {
  $.ajax({
    type: 'DELETE',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + entry + '?api_key=177',
    success: function (response, textStatus) {
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  })
}

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

// event handlers
$(document).on('keypress', 'input', function() {
  if (event.which === 13) {
    var temp = $('input').val();
    console.log(temp);
    $('.task-list').append(
      '<div class="task">' +
        '<hr>' +
        '<i class="far fa-square pr-3"></i>' +
        '<p class="d-inline">' + temp + '</p>' +
      '</div>'
    )
    $('input').val('');
    uploadSingleEntry(temp);
  }
});

$(document).on('click', '.fa-square', function() {

})



// populate list on DOM load
$(document).ready(function() {
  populateAll();
});
