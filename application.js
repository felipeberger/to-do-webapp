// ------------------ ajax methods -----------------

// populates the list with all tasks in the server
var populateAll = function() {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=177',
      dataType: 'json',
      success: function (response) {
        console.log(response);
        populateAllHelper(response);
      },

      error: function(request, errorMessage) {
        console.log(errorMessage);
      }
    });

  var populateAllHelper = function(elem) {
    elem.tasks.forEach(function (item) {
      var completed = item['completed'];
      var targetDom = completed ? '.inactive' : '.task-list';

      $(targetDom).append(
        '<div class="task ' + item['completed'] + '" id="' + item['id'] + '">' +
          '<hr>' +
          '<i class="far fa-square pr-3"></i>' +
          '<p class="d-inline">' + item['content'] + '</p>' +
        '</div>'
      )
    })
  };
};

// null --> int
var getLastId = function() {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=177',
    dataType: 'json',
    success: function (response) {
      console.log(response);
      getLastIdHelper(response);
    },

    error: function(request, errorMessage) {
      console.log(errorMessage);
    }
  });

  var getLastIdHelper = function (elem) {
    var largestId = 0;
    elem.tasks.forEach(function (item) {
      largestId = item['id'] > largestId ? item['id'] : largestId;
    })

    console.log(largestId);
    return(largestId);
  }
};

// saves new entry to server
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

// deletes entry from server
var deleteSingleEntry = function(id) {
  $.ajax({
    type: 'DELETE',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=177',
    success: function (response, textStatus) {
      console.log('Deleted: ' + response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  })
}

// changes complete status on server
var toggleCompleted = function (id, completed) {
  var newStatus = completed === true ? 'mark_active' : 'mark_complete';

  $.ajax({
    type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/' + newStatus + '?api_key=177',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({    }),
    success: function (response, textStatus) {
      console.log('Completed updated to ' + newStatus);
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

// remove before final version
var getAll = function () {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=177',
    dataType: 'json',
    success: function (response) {
      console.log(response);
    },

    error: function(request, errorMessage) {
      console.log(errorMessage);
    }
  });
}

// ------------------  event handlers ---------------------

// add new task to list
$(document).on('keypress', 'input', function() {
  if (event.which === 13) {
    var temp = $('input').val();
    var newId = null;
    uploadSingleEntry(temp);
    newId = getLastId();

    console.log(getLastID);
    console.log(newId);
    getAll();

    $('.task-list').append(
      '<div class="task false" id="' + newId + '">' +
        '<hr>' +
        '<i class="far fa-square pr-3"></i>' +
        '<p class="d-inline">' + temp + '</p>' +
      '</div>'
    )
    $('input').val('');
  }
});

// mark task completed and move to completed or viceversa
$(document).on('click', '.fa-square', function() {
  var divId = $(this).closest('.task').attr('id');
  var completed = $(this).closest('.task').attr('class').includes('true');
  var detachedElem = null;

  if (completed) {
    $(this).closest('.task').attr('class', 'task false');
  } else {
    $(this).closest('.task').attr('class', 'task true');
  }

  detachedElem = $(this).closest('.task').detach();

  if (completed) {
    $('.task-list').append(detachedElem);
  } else {
    $('.inactive').prepend(detachedElem);
  }

  toggleCompleted(divId, completed);
});

// delete task from list
// $(document).on('click', '.fa-square', function() {
//   var divId = $(this).closest('.task').attr('id');
//   deleteSingleEntry(divId);
//   $(this).closest('.task').remove();
// })

// ---------------- fire upon DOM load ----------------
$(document).ready(function() {
  populateAll();
});
