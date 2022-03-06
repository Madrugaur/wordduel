import './Game.css';
import React from 'react';
import {Helmet} from 'react-helmet';
let column = 0;
let row = 0;
function Game() { 
   const [grid, setGrid] = React.useState([[" "," "," "," "," "],
                              [" "," ","","",""],
                              ["","","","",""],
                              ["","","","",""],
                              ["","","","",""],
                              ["","","","",""]])
    const handleInsert = React.useCallback((letter, row, col) => {
        grid[row][col - 1] = letter
        setGrid([...grid])
    }, [grid]);

    const handleDelete = React.useCallback((letter, row, col) => {
        grid[row][col - 1] = " "
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
       
        <ChangingColorTextField handle={handleInsert} handleD={handleDelete}/>
    </>
  );
}
function ChangingColorTextField(props) {
    const { handle, handleD} = props;
    function handleKeyPress(e) {
        var key = e.key;
        console.log(key)
        console.log(e.keyCode)
        if(column === 5){
            row++;
            column = 0;
        }
        if(row === 6){
            //catch exception
        }
        column++;
        if (e.keyCode === 8) {
            column--;
            handleD(key,row,column)
        }
        handle(key, row, column)
    }
    

    return (
        <div>
            <input id="input" type="text" onKeyDown={(e) => handleKeyPress(e)}  />
        </div>
    )
}
export default Game;