import "./Selection.css";
import React from "react";
import { Helmet } from "react-helmet";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";

function Selection() {
  const [selection, setSelection] = React.useState("")
  const handleSelectionChange = React.useCallback((event) => {
    if (event.target.value === undefined) setSelection("")
    else setSelection(event.target.value)
  }, [selection])
  const navigate = useNavigate()
  const handleSubmit = React.useCallback((e) => {
    fetch(process.env.REACT_APP_BACKEND_URL + "/submit-word-selection", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        word: selection,
        code: localStorage.getItem("code"),
        username: localStorage.getItem("username")
      })
    }).then(res => res.json())
    .then(json => {
        if (json.accepted === true) {
          localStorage.setItem("wordSubmitted", selection)
          navigate("/waiting")
        }
    })
  }, [selection]);
  return (
    <>
      <Helmet>
        <style>{"body { background-color: black; }"}</style>
      </Helmet>
      <div className="Word-Duel">Word Duel</div>
      <div className="Selection">
        <div className="beginText">
          <p className="title">Word Selection</p>
          <p>Enter a five letter word:</p>
        </div>

        <div className="form">
          <div className="text">
            <TextField
              id="outlined-required"
              label=""
              placeholder="Type here..."
              color="secondary"
              focused
              onChange={handleSelectionChange}
            />
            {/* <Button className="randomBtn" variant="contained">
              RANDOMIZE
            </Button> */}
          </div>
          <div className="submitBtn">
            <Button onClick={handleSubmit} variant="contained">SUBMIT</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Selection;
