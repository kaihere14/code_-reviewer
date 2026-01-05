import React from 'react'
import { Routes,Route} from 'react-router-dom'

import Result from './pages/Result'
import Login from './pages/Login'
import AuthLoading from './pages/authLoading'
import Welcome from './pages/Welcome'
import Home from './pages/Home'
import Profile from './pages/Profile'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/result" element={<Result/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/oauth-success/verify" element={<AuthLoading/>} />
      </Routes>
    </div>
  )
}

export default App
