import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Welcome from "./Welcome"
import Waiting from "./Waiting"
import Selection from "./Selection"
import { Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Game from './Game';
export default function PageSwitcher() {
  return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/welcome" />} />
            <Route exact path="/welcome" element={<Welcome/>}/>
            <Route exact path="/waiting" element={<Waiting/>}/>
            <Route exact path="/dashboard" element={<Dashboard/>}/>
            <Route exact path="/selection" element={<Selection/>}/>
            <Route exact path="/game" element={<Game/>}/>
        </Routes>
  );
}