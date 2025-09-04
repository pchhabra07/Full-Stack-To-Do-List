import { useState } from 'react'
import { Routes, Route} from "react-router"

import HomePage from '../components/HomePage.jsx'
import LoginPage from '../components/LoginPage.jsx'
import RegisterPage from '../components/RegisterPage.jsx'
import TaskListPage from '../components/TaskListPage.jsx'

import './App.css'

function App() {

  return (
    <div className='app-container'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/tasks' element={<TaskListPage/>}/>
      </Routes>
    </div>
  )
}

export default App
