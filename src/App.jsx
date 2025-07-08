import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import StudentPage from './pages/student/StudentPage';
import StudentGroupPage from './pages/student/StudentGroupPage';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherGroupPage from './pages/teacher/TeacherGroupPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/student-dashboard' element={<StudentPage/>}/>
        <Route path="/student-dashboard/group/:groupId" element={<StudentGroupPage />} />
        <Route path='/teacher-dashboard' element={<TeacherDashboard/>}/>
        <Route path='/teacher-dashboard/group/:groupId' element={<TeacherGroupPage/>}/>
      </Routes>
    </div>
  )
}

export default App
