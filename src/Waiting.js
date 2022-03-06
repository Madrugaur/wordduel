import './Waiting.css';
import React from 'react';
import {Helmet} from 'react-helmet';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';




function Waiting() {
    const showShare = false;
    const showWordSubmit = true;

    const shareLinkComp = () => (
        <>
         <div className="link">
                <p>
                    Send this link to a friend to start:
                </p>
                <p>
                    Link: *insert link here*
                </p>
            </div>
                <div className='share'>
                    <CreateShareModal/>
                </div>
        </>
    )

    const wordSubmit = () => (
        <>
                <div className='wordSubmit'>
                    <p>WORD SUBMITTED!</p>
                </div>
        </>
    )

  return (

    
    
    <>
    <div className="">
      <Helmet>
        <style>{'body { background-color: black; }'}</style>
      </Helmet>
      <div className='Word-Duel-Title'>
            Word Duel
    </div>
   
    {
        showShare ? shareLinkComp() : <></>
    }
    {
        showWordSubmit ? wordSubmit() : <></>
    }
    
    </div>

    
    </>
  );
}

function CreateShareModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <div>
        <Button onClick={handleOpen}>SHARE</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>
            <Typography sx={{ color:'white' }} id="modal-modal-title" variant="h6" component="h2">
              Create a Room:
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 5 }}>
                <TextField
                id="outlined-required"
                variant="outlined"
                label="Room Name"
                placeholder='Name...'
                />
                <RadioButtonsGroup/>
            </Typography>
            <Button sx={{ color:'white' }} onClick={handleClose}>CREATE</Button>
            <Button sx={{ color:'white' }} onClick={handleClose}>CANCEL</Button>
          </Box>
        </Modal>
      </div>
    );
};

function RadioButtonsGroup() {
    return (
      <FormControl>
        <RadioGroup 
          aria-labelledby="radio-buttons-group-label"
          defaultValue="public"
          name="radio-buttons-group"
        >
          <FormControlLabel sx={{ color:'white' }}value="public" control={<Radio />} label="Public" />
          <FormControlLabel sx={{ color:'white' }}value="private" control={<Radio />} label="Private" />
        </RadioGroup>
      </FormControl>
    );
  }

const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



// class NameForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {value: ''};
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {    
//     this.setState({ value: event.target.value }); 
//   }
//   handleSubmit(event) { 
//     console.log(this.state.value)
//   }

//   render() {
//     return (
//       <div class ="form">
//         <div class="text">
//         <TextField
//           id="outlined-helperText"
//           label="Helper text"
//           placeholder="Default Value"
//           helperText="Some important text"
//           color="secondary"
//           focused
//         />
//         </div>
//         <div class="submitBtn">
//         <Button variant="contained">SUBMIT</Button>
//         </div>
        

//       </div>
      
//     );
//   }
// }

export default Waiting;
