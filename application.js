// ------------------ task populating methods -----------------
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
      $('.task-list').append(
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
      console.log('Uploaded: ' + response);
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
      console.log('Deleted: ' + response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  })
}

// ------------------  event handlers ---------------------

// add new task to list
$(document).on('keypress', 'input', function() {
  if (event.which === 13) {
    var temp = $('input').val();
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

// delete task from list
$(document).on('click', '.fa-square', function(elem) {
  var divId = $(this).closest('.task').attr('id');
  deleteSingleEntry(divId);
  $(this).closest('.task').remove();
})



// ---------------- fire upon DOM load ----------------
$(document).ready(function() {
  populateAll();
});
