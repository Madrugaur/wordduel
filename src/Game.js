import './Game.css';
import React, { useState } from 'react';
import {Helmet} from 'react-helmet';

let grid = [["h","e","l","l","o"],["f","u","c","c","c"],["h","d","d","d","d"],["h","d","d","d","d"],["f","d","d","d","d"],["f","u","c","k","y"]]
function Game() { 
   
  return (
    <>
        <Helmet>
            <style>{'body { background-color: black; }'}</style>
        </Helmet>
        <div className='Word-Duel'>
            Word Duel
        </div>

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
        <ChangingColorTextField/>
    </>
  );
}
function ChangingColorTextField() {
    const [highlight, setHighlight] = useState("2px solid black");
    function handleKeyPress(e) {
        var key = e.key;
        console.log( "You pressed a key: " + key );
        if (key === "r") {
            setHighlight("2px solid red")
        }
        else if (key === "g") {
            setHighlight("2px solid green")
        }
    }

    return (
        <div>
            <input type="text" onKeyPress={(e) => handleKeyPress(e)} style={{border: highlight}} />
        </div>
    )
}
export default Game;