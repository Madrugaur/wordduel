import './Welcome.css';
import React from 'react';
import {Helmet} from 'react-helmet';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { purple } from '@mui/material/colors';


function Welcome() {
  return (
    
    <>
    <div className="Welcome">
      <Helmet>
        <style>{'body { background-color: black; }'}</style>
      </Helmet>
      Welcome to Word Duel!
    </div>
    <div>
      <NameForm />
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

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    
    this.setState({ value: event.target.value }); 
  }
  handleSubmit(event) { 
    console.log(this.state.value)
  }

  render() {
    return (
      <div class ="form">
        <div class="text">
        <TextField
          id="outlined-helperText"
          label="Helper text"
          placeholder="Default Value"
          helperText="Some important text"
          color="secondary"
          focused
        />
        </div>
        <div class="submitBtn">
        <Button variant="contained">SUBMIT</Button>
        </div>
        

      </div>
      
    );
  }
}

export default Welcome;
