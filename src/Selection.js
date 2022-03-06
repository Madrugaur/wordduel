import './Selection.css';
import React from 'react';
import {Helmet} from 'react-helmet';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



function Selection() {
  return (
    
    <>
    <Helmet>
        <style>{'body { background-color: black; }'}</style>
      </Helmet>
    <div className='Word-Duel'>
            Word Duel
    </div>
    <div className="Selection">
    <div className="beginText">
        <p className="title">Word Selection</p>
        <p>Enter a five letter word:</p>
    </div>

      
      
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
      <div className ="form">
        <div className="text">
        <TextField
          id="outlined-required"
          label=""
          placeholder="Type here..."
         
        />
        <Button className="randomBtn" variant="contained">RANDOMIZE</Button>
        </div>
        <div className="submitBtn">
        <Button variant="contained">SUBMIT</Button>
        </div>
        

      </div>
      
    );
  }
}

export default Selection;
