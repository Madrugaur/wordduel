import './Welcome.css';
import React from 'react';
import {Helmet} from 'react-helmet';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';



function Welcome() {
  const [username, setUsername] = React.useState(undefined)
  const handleSubmit = () => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/new-player", {
      method: "POST",
      body: {
        name: username
      }
    }).then(res => res.json())
    .then(json => {
      console.log(json)
      if (json.status === "Sucess"){
        localStorage.setItem("username", username)
      } else {
        alert(username + " is already taken")
      }
    })
  }
  const handleNameChange = React.useCallback((event) => {
    setUsername(event.target.value)
  })
  return (
    <>
    <div className="Welcome">
      <Helmet>
        <style>{'body { background-color: black; }'}</style>
      </Helmet>
      Welcome to Word Duel!
    </div>
    <div>
      <NameForm handleNameChange={handleNameChange} handleSubmit={handleSubmit}/>
    </div>
    <div className="play">
      <p>How to Play:</p>
      <ul>
        <li>Create a public or private game or join an already created game.</li>
        <li>Choose a five letter word for your opponent to try to guess.</li>
        <li>Try to guess the word your opponent chose for you in the least amount of time possible and in as few guesses as possible.</li>
      </ul>
    </div>

    
    </>
  );
}

function SubmitBtn(props) {
  const { handleSubmit } = props;
  return(
    <div class="submitBtn2">
          <Button onClick={handleSubmit} variant="contained">SUBMIT</Button>
    </div>
  );
}

function NameForm(props) {
  const { handleNameChange, handleSubmit } = props;
  return (
    <div class ="form2">
      <div class="text2">
      <TextField
        id="outlined-helperText"
        label="Username"
        placeholder="Enter username..."
        helperText="Some important text"
        color="secondary"
        focused
        onChange={handleNameChange}
      />
      </div>
      <SubmitBtn handleSubmit={handleSubmit}/>
    </div>
    
  );
}

export default Welcome;
