import React from 'react';
import { Redirect, Switch, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import Welcome from "./Welcome"
import Waiting from "./Waiting"
import { Navigate } from 'react-router-dom';
export default function PageSwitcher() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate replace to="/welcome" />} />
            <Route exact path="/welcome" element={<Welcome/>}/>
            <Route exact path="/waiting" element={<Waiting/>}/>
        </Routes>
    </BrowserRouter>
  );
}