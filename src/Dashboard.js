import './Dashboard.css';
import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import List from "./List";
import Button from '@mui/material/Button';
import {Helmet} from 'react-helmet';


function Dashboard() {
  return (
    <>
        <Helmet>
            <style>{'body { background-color: black; }'}</style>
        </Helmet>
        <div className='Word-Duel'>
            Word Duel
        </div>

        <div className='Create-Room'>
            <Button>CREATE ROOM</Button>
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
            />
        </div>
        <div className="List">
            <List/>
        </div>
        
    </>
  );
}


export default Dashboard;