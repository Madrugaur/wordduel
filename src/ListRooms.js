import React from 'react';
import DUMMYJSON from "./DummyJSON";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LaunchIcon from '@mui/icons-material/Launch';
import Loading from "./Loading"
import './Dashboard.css';
import "./ListRooms.css"
function ListRooms(props) {
   
    return (
            <> 
            {
                <List>
                    {props.list.map((item, i) => (
                        <ListItem key={i}> 
                            <ListItemButton className='List'sx={[ {bgcolor:'gray'},{'&:hover': {backgroundColor: 'gray', }}]} onClick={() => props.joinRoom(item.code)}>
                             {item.name} 
                            <ListItemIcon>
                                <div style={{position:'absolute',right:'5px',top:'5px'}}>
                                    <LaunchIcon />   
                                </div>
                            </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            }
            </>
        );
    }

export default ListRooms
          