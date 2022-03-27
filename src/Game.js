import "./Game.css";
import React from "react";
import { Helmet } from "react-helmet";
import clsx from "clsx";
import { Tooltip } from "@mui/material";
function Game() {
  const ROWS = 6;
  const COLS = 5;

  function GridBox() {
    this.value = "";
    this.state = "N";
  }

  const [grid, setGrid] = React.useState(
    [...Array(ROWS)].map((i) => [...Array(COLS)].map((j) => new GridBox()))
  );
  const [canPlay, setCanPlay] = React.useState(true);
  const [row, setRow] = React.useState(0);
  const [col, setCol] = React.useState(0);
  const BACKSPACE = 8;
  const ENTER = 13;
  const [typed, setTyped] = React.useState([]);

	const [ erroredRowId, setErroredRowId ] = React.useState(undefined)

  const getClassName = (state) => {
    if (state === "N")      return clsx("bordered", "animated");
    else if (state === "B") return clsx("miss", "animateMiss");
    else if (state === "Y") return clsx("close", "animateClose");
    else if (state === "G") return clsx("match", "animateCorrect");
  };

  const handleInsert = React.useCallback(
    (letter, row, col) => {
      grid[row][col].value = letter;
      setGrid([...grid]);
    },
    [grid]
  );

  const handleStateUpdate = React.useCallback(
    (state, row, col) => {
      grid[row][col].state = state;
      setGrid([...grid]);
    },
    [grid]
  );

  function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  const handleSubmit = React.useCallback((guess) => {
		console.log(guess)
    fetch(process.env.REACT_APP_BACKEND_URL + "/guess-word", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guess: guess.toLowerCase(),
        code: localStorage.getItem("code"),
        username: localStorage.getItem("username"),
      }),
    }).then((res) =>
      res.json().then((json) => {
        if (res.status === 200) {
          const pattern = json.pattern;
          pattern.split("").forEach((element, index) => {
            handleStateUpdate(element, row, index);
          });
          console.log(pattern);
          setTyped([]);
          setRow(row + 1);
          setCol(0);
        } else if (res.status === 404) {
					if (json.error && json.error === "Unknown word") {
						setErroredRowId(row)
					} else {
						alert("404 error")
					}	
        }
      })
    );
  });

  const handleKeyPress = React.useCallback(
    (e) => {
      const code = e.keyCode;
      if (code === BACKSPACE) {
        if (col > 0) {
          handleInsert(" ", row, col - 1);
          setCol(col - 1);
          typed.pop();
          setTyped([...typed]);
					setErroredRowId(undefined)
        }
      } else if (code === ENTER) {
        if (col === 5 && row <= 5) {
          const guess = typed.reduce((current, accu) => (current += accu), "");
          handleSubmit(guess);
        }
      } else if (isLetter(String.fromCharCode(code))) {
        if (col <= 4 && row <= 5) {
          handleInsert(String.fromCharCode(code), row, col);
          setTyped([...typed, String.fromCharCode(code)]);
          typed.push(String.fromCharCode(code));
          setCol(col + 1);
        }
      }
    },
    [row, col, typed]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  const table = React.useMemo(
    () => (
      <div>
        <table className="Main-Table-Grid">
          <tbody>
            {grid.map((row, index) => {
							const error = erroredRowId === index
							return (
								<Tooltip arrow open={error} title="Unknown word" placement="left">
									<tr id={"main-table-row-" + index} className={clsx("main-row", error ? "unknownWord" : "")}>
										{row.map((box) => {
											return (
												<td
													className={clsx("main-tile", getClassName(box.state))}
												>
													{box.value}
												</td>
											);
										})}
									</tr>
								</Tooltip>
            )})}
          </tbody>
        </table>
      </div>
    ),
    [grid, erroredRowId]
  );
  return (
    <>
      <Helmet>
        <style>{"body { background-color: black; }"}</style>
      </Helmet>
      <div className="Word-Duel">Word Duel</div>
      {table}
    </>
  );
}

export default Game;
