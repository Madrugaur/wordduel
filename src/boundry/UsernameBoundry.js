import React from "react"
import { useNavigate } from "react-router"
import { GameContext } from "../contrext/GameContext"
import Welcome from "../Welcome";

export default function UsernameBoundry({ children }) {
    const navigate = useNavigate();
    const { state } = React.useContext(GameContext)
    const [ hasUsername, setHasUsername ] = React.useState(false)
    React.useEffect(() => {
        setHasUsername(state.username !== undefined)
    }, [state])

    const comp = React.useMemo(() => {
        if (hasUsername) {
            return <>{children}</>
        } else {
            navigate("/welcome")
            return (<Welcome />)
        }
    }, [hasUsername])

    return comp;
}

export function withUsernameBoundry(element) {
    return (<UsernameBoundry>{element}</UsernameBoundry>)
}