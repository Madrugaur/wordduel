import './Game.css';
import React from 'react';
import {Helmet} from 'react-helmet';
function Game() { 
   const [grid, setGrid] = React.useState([["","","","",""],
                              ["","","","",""],
                              ["","","","",""],
                              ["","","","",""],
                              ["","","","",""],
                              ["","","","",""]])
    const handleInsert = React.useCallback((letter, row, col) => {
        grid[row][col] = letter
        setGrid([...grid])
    }, [grid]);

    const table = React.useMemo(() => (
        <div >
        <table className="Table-Grid">
            <tbody>   
                {grid.slice(0, grid.length).map((item, index) => {
                    return (
                    <tr>
                        <td>{item[0]}</td>
                        <td>{item[1]}</td>
                        <td>{item[2]}</td>
                        <td>{item[3]}</td>
                        <td>{item[4]}</td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
    ), [grid])
  return (
    <>
        <Helmet>
            <style>{'body { background-color: black; }'}</style>
        </Helmet>
        <div className='Word-Duel'>
            Word Duel
        </div>
        {table}
       
        <ChangingColorTextField handle={handleInsert}/>
    </>
  );
}
function ChangingColorTextField(props) {
    const { handle} = props;
    const [row, setRow] = React.useState(0)
    const [col, setCol] = React.useState(0)
    const BACKSPACE = 8;
    const ENTER = 13;
    const [ typed, setTyped ] = React.useState([])
    function isLetter(str) {
        return str.length === 1 && str.match(/[a-z]/i);
    }
    const handleKeyPress = React.useCallback((e) => {
        const code = e.keyCode;
        if (code === BACKSPACE) {
            if (col > 0) {
                handle(" ", row, col-1);
                setCol(col-1);
                typed.pop()
                setTyped([...typed])
            }
        } else if (code === ENTER) {
            if (col === 5 && row <= 5) {
                const guess = typed.reduce((current, accu) => current += accu, "")
                console.log(guess)
                fetch(process.env.REACT_APP_BACKEND_URL + "/guess-word", {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                      guess: guess.toLowerCase(),
                      code: localStorage.getItem("code"),
                      username: localStorage.getItem("username")
                    })
                }).then(res => res.json().then(json => {
                    if (res.status === 200) {
                        const pattern = json.pattern
                        console.log(pattern)
                        setTyped([])
                        setRow(row + 1)
                        setCol(0)
                    } else if (res.status === 404) {
                        console.log(json.error)
                        alert("Unknown Word")
                    }
                }))
                
               
            }
        } else if (isLetter(String.fromCharCode(code))) {
            if (col  <= 4 && row <=5) {
                handle(String.fromCharCode(code), row, col)
                setTyped([...typed, String.fromCharCode(code)])
                typed.push(String.fromCharCode(code))
                setCol(col+1)
            }
        }
    }, [row, col, typed])
    console.log(typed)

    return (
        <div>
            <input type="text" onKeyDown={(e) => handleKeyPress(e)}  />
        </div>
    )
}
export default Game;