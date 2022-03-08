import './Welcome.css';
import React from 'react';
import {Helmet} from 'react-helmet';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { GameContext } from './contrext/GameContext';
import { Tooltip } from '@mui/material';



function Welcome() {
  const navigate = useNavigate()
  const gameContext = React.useContext(GameContext);
  const [username, setUsername] = React.useState(undefined)
  const handleSubmit = () => {
    gameContext.setUsername(username)

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
    <div className="submitBtn2">
          <Button onClick={handleSubmit} variant="contained">SUBMIT</Button>
    </div>
  );
}

function NameForm(props) {
  const { handleNameChange, handleSubmit } = props;
  return (
    <div className="form2">
      <div className="text2">
        <Tooltip arrow position="left" title="Username already in user" show={"true"}>
          <TextField
            id="outlined-helperText"
            label="Username"
            placeholder="Enter username..."
            helperText="Some important text"
            color="secondary"
            focused
            onChange={handleNameChange}
          />
        </Tooltip>
      </div>
      <SubmitBtn handleSubmit={handleSubmit}/>
    </div>
    
  );
}

export default Welcome;
