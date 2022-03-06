import './Waiting.css';
import React from 'react';
import {Helmet} from 'react-helmet';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ShareIcon from '@mui/icons-material/Share';
import { IconButton } from '@mui/material';



function Waiting() {
    const showShare = true;
    const showWordSubmit = false;

    const shareLinkComp = () => (
        <>
        <Box className="Box">
          <div className="link">
              <p className="Send">Send this link to a friend to start:</p>
              <p className="Linky">Link: *insert link here*</p>
          </div>

          <div className='share'>
            <CreateShareModal/>
          </div>
        </Box>
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
    <div>
      <Helmet>
        <style>{'body { background-color: black; }'}</style>
      </Helmet>

      <div className='Word-Duel-Title'>
          Word Duel
      </div>

      { showShare ? shareLinkComp() : <></> }
      { showWordSubmit ? wordSubmit() : <></> }

      <p class="waitingOpp">Waiting for opponent...</p>
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
        <IconButton onClick={handleOpen}>
          <span class="copyLink">COPY LINK</span>
          <ShareIcon/>
        </IconButton>
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>
            <Typography sx={{ color:'white' }} id="modal-modal-title" variant="h6" component="h2">
              Share
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 5 }}>
                <TextField
                id="outlined-required"
                variant="outlined"
                label="Room Name"
                placeholder='Name...'
                color="secondary"
                focused
                />
            </Typography>
          </Box>
        </Modal>
      </div>
    );
};


const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 225,
    bgcolor: 'gray',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default Waiting;
