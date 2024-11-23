import { useState } from 'react'
import HomePage from './pages/HomePage';
import RegisterForm from './pages/Register';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import './App.css'
import LoginForm from './pages/Login';
import ReportIncident from './pages/ReportIncident';
import Dashboard from './pages/Dashboard';
function App() {
  return (
     <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterForm/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/report-incident" element={<ReportIncident/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
     </Router>

     
  )
}

export default App
