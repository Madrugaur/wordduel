import { React, useState } from 'react';
import DUMMYJSON from "./DummyJSON";

function List(props) {
    return (
        <ul>
            {DUMMYJSON.map((item) => (
                <li key={item.id}>{item.text}</li>
            ))}
        </ul>
    )
}

export default List
