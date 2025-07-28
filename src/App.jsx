import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import StudentPage from './pages/student/StudentPage';
import StudentGroupPage from './pages/student/StudentGroupPage';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherGroupPageDEMO from './pages/teacher/TeacherGroupPageDEMO';
import TeacherGroupsPage from './pages/teacher/TeacherGroupsPage';
import TeacherSettingsPage from './pages/teacher/TeacherSettingsPage';
import TeacherGroupDetailsPage from './pages/teacher/TeacherGroupDetailPage';
import StudentProfilePage from './pages/student/StudentProfilePage';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/student-dashboard' element={<StudentPage/>}/>
        <Route path="/student-dashboard/group/:groupId" element={<StudentGroupPage />} />
        <Route path='/teacher-dashboard' element={<TeacherDashboard/>}/>
<Route path='/teacher-dashboard/group/:groupId/lesson/:date' element={<TeacherGroupPageDEMO />} />
        <Route path="/teacher-dashboard/groups" element={<TeacherGroupsPage />} />
        <Route path="/teacher-dashboard/settings" element={<TeacherSettingsPage />} />
 <Route path='/teacher-dashboard/group-detail/:groupId' element={<TeacherGroupDetailsPage />} />
 <Route path='/student-dashboard/profile' element = {<StudentProfilePage/>}/>


      </Routes>
    </div>
  )
}

export default App
