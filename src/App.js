import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import Login from './Components/Login/Login'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import SideBar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Components/Dashboard/Dashboard";
import PayrollRouter from './Components/Payroll/PayrollRouter';
import TasksRouter from './Components/Tasks/TasksRouter';
import AttendancesRouter from './Components/Attendances/AttendancesRouter';
import CoreHRRouter from './Components/CoreHR/CoreHRRouter';
import EmployeesRouter from './Components/Employees/EmployeesRouter';
import EmployeeDetails from './Components/Employees/EmployeeDetails';
import PerformanceRouter from './Components/Performances/PerformanceRouter';
import RecruitmentRouter from './Components/Recruitment/RecruitmentRouter';
import TrainingRouter from './Components/Training/TrainingRouter';
import Helpdesk from './Components/Helpdesk/Helpdesk';
import TicketDetails from './Components/Helpdesk/TicketDetails';
import ClientList from './Components/ManageClient/ClientList';
import LeaveRouter from './Components/LeaveRequest/LeaveRouter';
import { AuthService } from '../src/services/AuthService';

function App() {
    return ( 
        <Router>
            <Routes >
                <Route path = "/" element={<Navigate to="/login" replace />} />
                <Route path = "/login" element = { < Login / > }/>
                <Route path = "/reset-password" element = { < ForgetPassword / > }/>
                <Route path = "/*" element = { < DashboardLayout / > }/>  
            </Routes > 
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Router>
    );
}

function DashboardLayout() {
    return (
        <div style={{ display: "flex" }}>
        <SideBar />
            <Routes>
            {AuthService.isAuthorized() ? (
                <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employees/*" element={<EmployeesRouter />} />
                <Route path="/employee-details/:id" element={<EmployeeDetails />} />
                <Route path="/payroll/*" element={<PayrollRouter />} />
                <Route path="/attendances/*" element={<AttendancesRouter />} />
                <Route path="/tasks/*" element={<TasksRouter />} />
                <Route path="/performance/*" element={<PerformanceRouter />} />
                <Route path="/corehr/*" element={<CoreHRRouter />} />
                <Route path="/recruitment/*" element={<RecruitmentRouter />} />
                <Route path="/training/*" element={<TrainingRouter />} />
                <Route path="/helpdesk" element={<Helpdesk />} />
                <Route path="/helpdesk/ticket-details/:id" element={<TicketDetails />} />
                <Route path="/leave/*" element={<LeaveRouter />} />
                <Route path="/client-list" element={<ClientList />} />
                </>
            ) : (
                <Route path="*" element={<Navigate replace to="/login" />} />
            )}
            </Routes>
        </div>
    );
}
export default App;
