import './Selection.css';
import React from 'react';
import {Helmet} from 'react-helmet';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function Selection() {
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

  handleChange(event) {    this.setState({value: event.target.value});  }
  handleSubmit(event) { console.log(this.state.value)}

  render() {
    return (
      <div class ="form">
        <div class="text">
        <TextField
          id="outlined-required"
          label="Username"
          placeholder="Enter username..."
         
        />
        </div>
        <div class="submitBtn">
        <Button variant="contained">SUBMIT</Button>
        </div>
        

      </div>
      
    );
  }
}

export default Selection;
