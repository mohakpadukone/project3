"use strict";

var handleWorkout = function handleDomo(e) {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 350);

  if ($("#workoutName").val() == '' || $("#workoutSets").val() == '' || $("#workoutReps").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax('POST', $("#workoutForm").attr("action"), $("#workoutForm").serialize(), function () {

    var csrf = document.querySelector('#workoutForm').querySelector('#csrfToken').value;

    loadWorkoutsFromServer(csrf);
  });

  return false;
};


var WorkoutForm = function WorkoutForm(props) {
  return React.createElement(
    "form",
    { id: "workoutForm", name: "workoutForm",
      onSubmit: handleWorkout,
      action: "/maker",
      method: "POST",
      className: "workoutForm"
    },
    React.createElement(
      "label",
      { htmlFor: "name" },
      "Excercise: "
    ),
    React.createElement("input", { id: "workoutName", type: "text", name: "name", placeholder: "Workout Name" }),
    React.createElement(
      "label",
      { htmlFor: "sets" },
      "Sets: "
    ),
    React.createElement("input", { id: "workoutSets", type: "text", name: "sets", placeholder: "Workout Sets" }),
    React.createElement(
      "label",
      { htmlFor: "reps" },
      "Reps: "
    ),
    React.createElement("input", { id: "workoutReps", type: "text", name: "reps", placeholder: "Workout Reps" }),
    React.createElement("input", { id: "csrfToken", type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("input", { className: "makeWorkoutSubmit", type: "submit", value: "Add" })
  );
};

var WorkoutList = function WorkoutList(props) {
  if (props.workouts.length === 0) {
    return React.createElement(
      "div",
      { className: "WorkoutList" },
      React.createElement(
        "h3",
        { className: "empty" },
        "No Workouts Yet"
      )
    );
  }
    


  var workoutNodes = props.workouts.map(function (workout) {
    return React.createElement(
      "div",
      { key: workout._id, className: "workout" },
      React.createElement(
        "h3",
        { className: "workoutName" },
        "Name: ",
        workout.name
      ),
      React.createElement(
        "h3",
        { className: "workoutSets" },
        "Sets: ",
        workout.sets
      ),
       React.createElement(
        "h3",
        { className: "workoutReps" },
        "Reps: ",
        workout.reps
      )
    );
  });

  return React.createElement(
    "div",
    { className: "workoutList" },
    workoutNodes
  );
};



var loadWorkoutsFromServer = function loadWorkoutsFromServer(csrf) {
  sendAjax('GET', '/getWorkouts', null, function (data) {
    ReactDOM.render(React.createElement(WorkoutList, { csrf: csrf, workouts: data.workouts }), document.querySelector("#workouts"));
  });
};
    
//var loadStatsFromServer = function loadStatsFromServer(csrf) {
//  sendAjax('GET', '/getStats', null, function (data) {
//    ReactDOM.render(React.createElement(StatsList, { csrf: csrf, stats: data.stats }), document.querySelector("#stats"));
//  });
//};

var setup = function setup(csrf) {
  ReactDOM.render(React.createElement(WorkoutForm, { csrf: csrf }), document.querySelector("#makeWorkout"));

  ReactDOM.render(React.createElement(WorkoutList, { csrf: csrf, workouts: [] }), document.querySelector("#workouts"));
  loadWorkoutsFromServer(csrf);
    
//  ReactDOM.render(React.createElement(StatsList, { csrf: csrf, stats: [] }), document.querySelector("#stats"));
//  loadStatsFromServer(csrf);
};
    

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) { 
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
  $("#domoMessage").animate({ width: 'hide' }, 350);
  window.location = response.redirect;
};



var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
