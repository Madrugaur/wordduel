import React from "react"
import { useNavigate } from "react-router";

const defaultState = {
    code: undefined,
    username: undefined,
    wordSubmitted: undefined,
    status: undefined,
}
export const GameContext = React.createContext(defaultState);

export function GameContextProvider(props) {
    const [ state, setState ] = React.useState(defaultState);
    const navigate = useNavigate()
    
    const setUsername = React.useCallback((username) => {
        fetch(process.env.REACT_APP_BACKEND_URL + "/new-player", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: username})
          }).then(res => res.json())
          .then(json => {
            console.log(json)
            if (json.status === "sucess"){
              setState({...state, username})
              navigate("/dashboard")
            } else {
              alert(json.error)
            }
          })
    })
    const setCode = React.useCallback((code) => setState({...state, code}))

    React.useEffect(() => {
        // Refresh Game State
        setInterval(() => {
            fetch(process.env.REACT_APP_BACKEND_URL + "/room-status?code="+localStorage.getItem("code"), {
              method: "GET"
            }).then(res => res.json())
            .then(json => {
                if (json.status) {
                    if (json.status !== state.status)
                        setState({...state, status: json.status})
                }
            })
          }, 2000)
    }, [state.status])


    const value = { state, setUsername, setCode }
    return <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
}