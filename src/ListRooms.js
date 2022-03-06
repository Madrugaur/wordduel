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
    const [ allRooms, setRooms ] = React.useState([])
    const [ filteredRooms, setFilteredRooms ] = React.useState([])
    const [ filter, setFilter ] = React.useState(undefined)

    const joinRoom = React.useCallback((code) => {
        console.log(code)
    })

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
            {
                allRooms.length === 0 ? <Loading type={"spin"} color={"#FFFFFF"}/> : 
                <List>
                    {allRooms.map((item, i) => (
                        <ListItem key={i}> 
                            <ListItemButton className='List'sx={[ {bgcolor:'gray'},{'&:hover': {backgroundColor: 'gray', }}]} onClick={() => joinRoom(item.code)}>
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
          