const handleWorkout = (e) =>{
  e.preventDefault();
  
  $("#domoMessage").animate({width: 'hide'}, 350);
  
  if($("#workoutName").val() == '' || $("#WorkoutSets").val() == '' || $("#WorkoutReps").val() == ''){
    handleError("RAWR! All fields are equired");
    return false;
  }
  
  sendAjax('POST', $("#workoutForm").attr("action"), $("workoutForm").serialize(), function(){
    

    const csrf = document.querySelector('#workoutForm').querySelector('#csrfToken').value;
    
    loadWorkoutsFromServer(csrf);
  });
  
  return false;
};

const WorkoutForm = (props) =>{
  return(
  <form id="workoutForm" name="workoutForm"
        onSubmit={handleWorkout}
        action="/maker"
        method='POST'
        className="workoutForm"
    >
    <label for="name">Exercise: </label>
      <input id="workoutName" type="text" name="name" placeholder="Name"/>
      <label for="sets">Sets: </label>
      <input id="workoutSets" type="text" name="sets" placeholder="Sets"/>
      <label for="reps">Reps: </label>
      <input id="workoutReps" type="text" name="reps" placeholder="Reps"/>
      <input type="hidden" name="_csrf" value={{csrfToken}} />
      <input class="makeWorkoutSubmit" type="submit" value="Add" />
  </form>
  );
};

const WorkoutList = function(props){
  if(props.workouts.length === 0){
    return(
      <div className="workoutList">
        <h3 className="empty">No Workouts Yet</h3>
      </div>
    );
  }
  
  const workoutNodes = props.workouts.map(function(workout){
    return(
      <div key={workout._id} className="workout">
        <h3 className="workoutName">Name: {workout.name}</h3>
        <h3 className="workoutSets">Sets: {workout.sets}</h3>
        <h3 className="workoutReps">Reps: {workout.reps}</h3>
      </div>
    );
  });
  
  return(
    <div className="workoutList">
      {workoutNodes}
    </div>
  );
};

const loadWorkoutsFromServer = (csrf) =>{
  sendAjax('GET', '/getWorkouts', null, (data) =>{
    ReactDOM.render(
      <WorkoutList csrf={csrf} workouts={data.workouts} />,
      document.querySelector("#workouts")
    );
  });
};

const setup = function(csrf){
  ReactDOM.render(
    <WorkoutFormForm csrf={csrf} />,
    document.querySelector("#makeWorkout")
  );
  
  ReactDOM.render(
    <WorkoutList csrf={csrf} workouts={[]} />,
    document.querySelector("#workouts")
  ); 
  loadWorkoutsFromServer(csrf);
};


const getToken = () =>{
  sendAjax('GET', '/getToken', null, (result) =>{
    setup(result.csrfToken);
  });
};

$(document).ready(function(){
  getToken();
});
