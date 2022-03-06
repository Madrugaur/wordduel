import React from 'react';
import DUMMYJSON from "./DummyJSON";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LaunchIcon from '@mui/icons-material/Launch';
import './Dashboard.css';

function ListRooms(props) {
    const [ allRooms, setRooms ] = React.useState([])
    const [ filteredRooms, setFilteredRooms ] = React.useState([])
    React.useEffect(() => {
        setInterval(() => {
            fetch(process.env.REACT_APP_BACKEND_URL + "/open-rooms", {
                method: "GET",
                mode: "cors"
            }).then(res => res.json())
            .then(result => {
                console.log(result)
            }).catch(error => console.log(error))
        }, 5000)
    })
    
    return (
            <>
                <List>
                    {DUMMYJSON.map((item) => (
                        <ListItem key={item.id}> 
                            <ListItemButton className='List'sx={[ {bgcolor:'gray'},{'&:hover': {backgroundColor: 'gray', }}]} onClick={() => {console.log("Hello")}}>
                             {item.text} 
                            <ListItemIcon>
                                <div style={{position:'absolute',right:'5px',top:'5px'}}>
                                    <LaunchIcon />   
                                </div>
                            </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                </>
                );
            }

export default ListRooms
          