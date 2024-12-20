import { useState } from 'react'
import HomePage from './pages/HomePage';
import RegisterForm from './pages/Register';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Link } from 'react-router-dom';
import './App.css'
import LoginForm from './pages/Login';
import ReportIncident from './pages/ReportIncident';
import Dashboard from './pages/Dashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MaintenancePage from './DashboardCompo/MaintenancePage';
import UserDashboard from './UserDashBoard/UserDashboard';

function App() {
  return (
    <>
      <ToastContainer position="top-right" />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterForm/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/report-incident" element={<ReportIncident/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/Voldash" element={<VolunteerDashboard/>}/>
          <Route path="/dashboard/incidents" element={<MaintenancePage />} />
          <Route path="/dashboard/notifications" element={<MaintenancePage />} />
          <Route path="/dashboard/analytics" element={<MaintenancePage />} />
           <Route path="/dashboard/settings" element={<MaintenancePage />} />
           <Route path="/user-dashboard" element={<UserDashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
