import React from "react";
import { useNavigate } from "react-router";

const defaultState = {
  code: undefined,
  username: undefined,
  wordSubmitted: undefined,
  status: undefined,
};
export const GameContext = React.createContext(defaultState);

export function GameContextProvider(props) {
  const [state, setState] = React.useState(defaultState);
  const navigate = useNavigate();

  const setUsername = React.useCallback(
    (username, setError) => {
      fetch(process.env.REACT_APP_BACKEND_URL + "/new-player", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username }),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (json.status === "sucess") {
            setState({ ...state, username });
            navigate("/dashboard");
          } else {
            setError(true)
          }
        });
    },
    [state]
  );

  const createRoom = React.useCallback(
    (private_, name) => {
      fetch(process.env.REACT_APP_BACKEND_URL + "/create-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          private: private_,
          name: name,
          username: state.username,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status === "Sucess") {
            setState({ ...state, code: json.code });
            navigate("/waiting");
          }
        });
    },
    [state]
  );

  const setCode = React.useCallback((code) => setState({ ...state, code }));

  React.useEffect(() => {
    // Refresh Game State
    setInterval(() => {
      if (state.code !== undefined) {
        fetch(
          process.env.REACT_APP_BACKEND_URL +
            "/room-status?code=" +
            localStorage.getItem("code"),
          {
            method: "GET",
          }
        )
          .then((res) => res.json())
          .then((json) => {
            if (json.status) {
              if (json.status !== state.status)
                setState({ ...state, status: json.status });
            }
          });
      }
    }, 2000);
  }, [state.status, state.code]);

  const value = { state, setUsername, setCode, createRoom };
  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
}
