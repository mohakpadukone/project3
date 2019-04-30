const handleStats = (e) =>{
  e.preventDefault();
  
  $("#domoMessage").animate({width: 'hide'}, 350);
  
  if($("#statsName").val() == '' || $("#statsAge").val() == '' || $("#statsHeight").val() == '' || $("#statsWeight").val() == ''){
    handleError("RAWR! All fields are yequired");
    return false;
  }
  
  sendAjax('POST', $("#statsForm").attr("action"), $("statsForm").serialize(), redirect, function(){
    

    const csrf = document.querySelector('#statsForm').querySelector('#csrfToken').value;
    
    loadStatsFromServer(csrf);
  });
  
  return false;
};

const StatsForm = (props) =>{
  return(
  <form id="statsForm" name="statsForm"
        onSubmit={handleStats}
        action="/stats"
        method='POST'
        className="statsForm"
    >
     <div id="fill">
      <label for="name">Name </label>
      <input id="statsName" type="text" name="name" placeholder="Name"/>
      </div>
        <div id="fill">
      <label for="age">Age </label>
      <input id="statsAge" type="text" name="age" placeholder="age"/>
        </div><div id="fill">
      <label for="height">Height </label>
      <input id="statsHeight" type="text" name="height" placeholder="Inches"/>
      </div><div id="fill">
      <label for="weight">Weight </label>
      <input id="statsWeight" type="text" name="weight" placeholder="lbs"/>
      <input type="hidden" name="_csrf" value={{csrfToken}} />
      <input class="makeStatsSubmit" type="submit" value="Save" />
    </div>
  </form>
  );
};

const StatsList = function(props){
  if(props.stats.length === 0){
    return(
      <div className="statsList">
        <h3 className="empty">No Workouts Yet</h3>
      </div>
    );
  }
  
  const statsNodes = props.stats.map(function(stats){
    return(
      <div key={stats._id} className="stats">
        <h3 className="statsName">Name: {stats.name}</h3>
//        <h3 className="workoutSets">Sets: {workout.sets}</h3>
//        <h3 className="workoutReps">Reps: {workout.reps}</h3>
      </div>
    );
  });
  
  return(
    <div className="statsList">
      {statsNodes}
    </div>
  );
};

const loadStatsFromServer = (csrf) =>{
  sendAjax('GET', '/getStats', null, (data) =>{
    ReactDOM.render(
      <StatsList csrf={csrf} stats={data.stats} />,
      document.querySelector("#stats")
    );
  });
};

const setup = function(csrf){
  ReactDOM.render(
    <WorkoutForm csrf={csrf} />,
    document.querySelector("#stats")
  );
  
  ReactDOM.render(
    <StatsList csrf={csrf} stats={[]} />,
    document.querySelector("#stats")
  ); 
  loadStatsFromServer(csrf);
};


const getToken = () =>{
  sendAjax('GET', '/getToken', null, (result) =>{
    setup(result.csrfToken);
  });
};

$(document).ready(function(){
  getToken();
});