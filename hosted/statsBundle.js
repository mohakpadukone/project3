"use strict";

var handleStats = function handleStats(e) {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 350);

  if ($("#statsName").val() == '' || $("#statsAge").val() == '' || $("#statsHeight").val() == '' || $("#statsWeight").val() == '') {
    handleError("RAWR! All fields are sequired");
    return false;
  }

  sendAjax('POST', $("#statsForm").attr("action"), $("#statsForm").serialize(), redirect, function () {

    var csrf = document.querySelector('#statsForm').querySelector('#csrfToken').value;

//    loadStatsFromServer(csrf);
  });

  return false;
};

var StatsForm = function StatsForm(props) {
  return React.createElement(
    "form",
    { id: "statsForm", name: "statsForm",
      onSubmit: handleStats,
      action: "/stats",
      method: "POST",
      className: "statsForm"
    },
    React.createElement(
      "h3",
      { },
      "Enter information to access your health"
    ),
    React.createElement(
      "label",
      { htmlFor: "name" },
      "Name: "
    ),
    React.createElement("input", { id: "statsName", type: "text", name: "name", placeholder: "Name" }),
    React.createElement(
      "label",
      { htmlFor: "age" },
      "Age: "
    ),
    React.createElement("input", { id: "statsAge", type: "text", name: "age", placeholder: "Age" }),
    React.createElement(
      "label",
      { htmlFor: "height" },
      "Height: "
    ),
    React.createElement("input", { id: "statsHeight", type: "text", name: "height", placeholder: "Inches" }),
     React.createElement(
      "label",
      { htmlFor: "weight" },
      "Weight: "
    ),
    React.createElement("input", { id: "statsWeight", type: "text", name: "weight", placeholder: "lbs" }),
    React.createElement("input", { id: "csrfToken", type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("input", { className: "makeStatsSubmit", type: "submit", value: "Save" })
  );
};

var createStatsForm = function createStatsForm(csrf) {
  ReactDOM.render(React.createElement(StatsForm, { csrf: csrf }), document.querySelector("#stats"));
};

//var WorkoutList = function WorkoutList(props) {
//  if (props.workouts.length === 0) {
//    return React.createElement(
//      "div",
//      { className: "WorkoutList" },
//      React.createElement(
//        "h3",
//        { className: "empty" },
//        "No Workouts Yet"
//      )
//    );
//  }

//  var workoutNodes = props.workouts.map(function (workout) {
//    return React.createElement(
//      "div",
//      { key: workout._id, className: "workout" },
//      React.createElement(
//        "h3",
//        { className: "workoutName" },
//        "Name: ",
//        workout.name
//      ),
//      React.createElement(
//        "h3",
//        { className: "workoutSets" },
//        "Sets: ",
//        workout.sets
//      ),
//       React.createElement(
//        "h3",
//        { className: "workoutReps" },
//        "Reps: ",
//        workout.reps
//      )
//    );
//  });

//  return React.createElement(
//    "div",
//    { className: "workoutList" },
//    workoutNodes
//  );
//};

//var loadWorkoutsFromServer = function loadWorkoutsFromServer(csrf) {
//  sendAjax('GET', '/getWorkouts', null, function (data) {
//    ReactDOM.render(React.createElement(WorkoutList, { csrf: csrf, workouts: data.workouts }), document.querySelector("#workouts"));
//  });
//};

var setup = function setup(csrf) {
  //ReactDOM.render(React.createElement(StatsForm, { csrf: csrf }), document.querySelector("#statsWorkout"));
  createStatsForm(csrf);
//  ReactDOM.render(React.createElement(WorkoutList, { csrf: csrf, workouts: [] }), document.querySelector("#workouts"));
//  loadWorkoutsFromServer(csrf);
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
