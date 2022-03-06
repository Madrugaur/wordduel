import './Dashboard.css';
import React, { useReducer } from 'react';
import TextField from "@mui/material/TextField";
import List from "./ListRooms";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Helmet} from 'react-helmet';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

function Dashboard() {
  const [ allRooms, setRooms ] = React.useState([])
  const [ filteredRooms, setFilteredRooms ] = React.useState([])
  const [ filter, setFilter ] = React.useState(undefined)
  const joinRoom = React.useCallback((code) => {
      console.log(code)
  })

  const handleSearchBarChange = React.useCallback((event) => {
    setFilter(event.target.value)
  })

  React.useEffect(() => 
    setFilteredRooms(filter === undefined ? allRooms : allRooms.filter(room => 
        room.name.startsWith(filter))), [allRooms, filter])

  React.useEffect(() => {
      const updateRooms = () => {
          fetch(process.env.REACT_APP_BACKEND_URL + "/open-rooms", {
              method: "GET",
              mode: "cors"
          }).then(res => res.json())
          .then(result => {
              setRooms(result)
          }).catch(error => console.log(error))
      }
      setInterval(() => updateRooms(), 5000)
  }, [])
  
  return (
    <>
        <Helmet>
            <style>{'body { background-color: black; }'}</style>
        </Helmet>
        <div className='Word-Duel'>
            Word Duel
        </div>
        <div className='Create-Room'>
            <CreateRoomModal/>
        </div>

        <div className='Join-Room'>
            Join Room:
        </div>

        <div className="Search-Bar">
            <TextField
            id="outlined-required"
            variant="outlined"
            label="Search"
            placeholder='Search...'
            color="secondary"
            focused
            onChange={(event) => handleSearchBarChange(event)}
            />
        </div>
        <div className="List">
            { allRooms.length === 0 ? <Loading type={"spin"} color={"#FFFFFF"}/> : <List list={filteredRooms} joinRoom={joinRoom}/>}
        </div>
        
    </>
  );
}

function CreateRoomModal() {
    const [open, setOpen] = React.useState(false);
    const [ private_, setPrivate ] = React.useState(false)
    const [ name, setName ] = React.useState("")
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const handleNameChange = React.useCallback((event) =>{
      if (event.target.value === undefined) setName("WordDuel Room")
      else setName(event.target.value)
    },[])
    const handleCreateRoom = React.useCallback(() => {
      fetch(process.env.REACT_APP_BACKEND_URL + "/create-room", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          private: private_,
          name: name,
          username: localStorage.getItem("username")
        })
      }).then(res => res.json())
      .then(json => {
        if (json.status === "Sucess") {
          localStorage.setItem("waiting", true)
          navigate("/waiting")
        }
      })
    })
    return (
      <div>
        <Button onClick={handleOpen}>CREATE ROOM</Button>
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
                color="secondary"
                focused
                onChange={(event) => handleNameChange(event)}
                />
                <RadioButtonsGroup/>
            </Typography>
            <Button sx={{ color:'white' }} onClick={() => handleCreateRoom()}>CREATE</Button>
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
          <FormControlLabel sx={{ color:'white',paddingLeft:4 }}value="public" control={<Radio />} label="Public" />
          <FormControlLabel sx={{ color:'white',paddingLeft:4 }}value="private" control={<Radio />} label="Private" />
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

export default Dashboard;