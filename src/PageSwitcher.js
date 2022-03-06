import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Welcome from "./Welcome"
import Selection from "./Selection"
import { Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
export default function PageSwitcher() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate replace to="/welcome" />} />
            <Route exact path="/welcome" element={<Welcome/>}/>
            <Route exact path="/dashboard" element={<Dashboard/>}/>
            <Route exact path="/selection" element={<Selection/>}/>
        </Routes>
    </BrowserRouter>
  );
}